import { useEffect, useState } from 'react'

const emptyContributionWeeks = () => Array.from({ length: 53 }, () => Array.from({ length: 7 }, () => 'l0'))

const initialState = {
  loading: true,
  error: false,
  tokenMissing: false,
  profile: null,
  popularRepos: [],
  personalProjects: [],
  organizationProjects: [],
  repositoryCount: 0,
  stars: 0,
  contributions: 0,
  contributionWeeks: emptyContributionWeeks(),
  monthMarkers: [],
}

function getContributionDataFromCalendar(calendar, selectedYear) {
  if (!calendar) {
    return {
      contributions: 0,
      contributionWeeks: emptyContributionWeeks(),
      monthMarkers: [],
    }
  }

  const levelMap = {
    NONE: 'l0',
    FIRST_QUARTILE: 'l1',
    SECOND_QUARTILE: 'l2',
    THIRD_QUARTILE: 'l3',
    FOURTH_QUARTILE: 'l4',
  }

  const contributionWeeks = calendar.weeks.map((week) =>
    week.contributionDays.map((day) => levelMap[day.contributionLevel] || 'l0'),
  )

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const selectedYearText = String(selectedYear)
  const monthStartMap = new Map()

  calendar.weeks.forEach((week, weekIndex) => {
    week.contributionDays.forEach((day) => {
      if (!day?.date || !day.date.startsWith(`${selectedYearText}-`)) return

      const monthNumber = Number(day.date.slice(5, 7))
      if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) return

      if (!monthStartMap.has(monthNumber)) {
        monthStartMap.set(monthNumber, weekIndex)
      }
    })
  })

  const monthMarkers = [...monthStartMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([monthNumber, weekIndex]) => ({ month: monthNames[monthNumber - 1], weekIndex }))

  return {
    contributions: calendar.totalContributions || 0,
    contributionWeeks,
    monthMarkers,
  }
}

export function useGithubData({ githubUsername, githubToken, selectedYear }) {
  const [githubData, setGithubData] = useState(initialState)

  useEffect(() => {
    const loadMainGitHubData = async () => {
      try {
        const restHeaders = githubToken ? { Authorization: `Bearer ${githubToken}` } : undefined

        const fetchRepoStack = async (repo) => {
          const fallbackStats = repo.language
            ? [{ name: repo.language, percent: 100 }]
            : [{ name: 'Code', percent: 100 }]

          const normalizeStack = (stats) => {
            const isCodeManiaRepo = /code-?mania/i.test(repo.name)
            if (!isCodeManiaRepo) return stats
            const filtered = stats.filter((item) => item.name !== 'C++')
            return filtered.length ? filtered : stats
          }

          try {
            const response = await fetch(`https://api.github.com/repos/${repo.full_name}/languages`, {
              headers: restHeaders,
            })

            if (!response.ok) {
              return { ...repo, languageStats: normalizeStack(fallbackStats) }
            }

            const languages = await response.json()
            const entries = Object.entries(languages)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 4)

            const totalBytes = entries.reduce((sum, [, bytes]) => sum + bytes, 0)
            const languageStats = entries.map(([name, bytes]) => ({
              name,
              percent: totalBytes > 0 ? Number(((bytes / totalBytes) * 100).toFixed(1)) : 0,
            }))

            return {
              ...repo,
              languageStats: normalizeStack(languageStats.length ? languageStats : fallbackStats),
            }
          } catch {
            return { ...repo, languageStats: normalizeStack(fallbackStats) }
          }
        }

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`, { headers: restHeaders }),
          fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`, {
            headers: restHeaders,
          }),
        ])

        if (!userRes.ok || !reposRes.ok) {
          throw new Error('Unable to fetch GitHub profile')
        }

        const user = await userRes.json()
        const repos = await reposRes.json()
        const orgsRes = await fetch(`https://api.github.com/users/${githubUsername}/orgs`, {
          headers: restHeaders,
        })
        const orgs = orgsRes.ok ? await orgsRes.json() : []

        const eventsRes = await fetch(`https://api.github.com/users/${githubUsername}/events/public?per_page=100`, {
          headers: restHeaders,
        })
        const events = eventsRes.ok ? await eventsRes.json() : []

        const stars = repos.reduce((total, repo) => total + repo.stargazers_count, 0)

        const popularRepos = [...repos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
          .slice(0, 6)

        const personalProjectsRaw = [...repos]
          .filter((repo) => !repo.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6)

        const projectEventTypes = new Set([
          'PushEvent',
          'PullRequestEvent',
          'PullRequestReviewEvent',
          'CreateEvent',
        ])

        const organizationRepoNames = [
          ...new Set(
            events
              .filter((event) => projectEventTypes.has(event.type))
              .map((event) => event.repo?.name)
              .filter((name) => {
                if (!name) return false
                const owner = name.split('/')[0]
                return owner && owner.toLowerCase() !== githubUsername.toLowerCase()
              }),
          ),
        ].slice(0, 8)

        const organizationRepoDetails = await Promise.all(
          organizationRepoNames.map(async (fullName) => {
            const response = await fetch(`https://api.github.com/repos/${fullName}`, { headers: restHeaders })
            if (!response.ok) return null
            return response.json()
          }),
        )

        const organizationProjectsRaw = organizationRepoDetails
          .filter(Boolean)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6)

        const [personalProjects, organizationProjects] = await Promise.all([
          Promise.all(personalProjectsRaw.map(fetchRepoStack)),
          Promise.all(organizationProjectsRaw.map(fetchRepoStack)),
        ])

        setGithubData((prev) => ({
          ...prev,
          loading: false,
          error: false,
          tokenMissing: !githubToken,
          profile: {
            avatarUrl: user.avatar_url,
            name: user.name || githubUsername,
            login: user.login || githubUsername,
            bio: user.bio || 'Junior Software Developer',
            followers: user.followers || 0,
            following: user.following || 0,
            location: user.location || 'Unknown location',
            blog: user.blog || '',
            company: user.company || '',
            twitter: user.twitter_username || '',
            profileUrl: user.html_url || `https://github.com/${githubUsername}`,
            organizations: orgs.map((org) => ({
              id: org.id,
              login: org.login,
              avatarUrl: org.avatar_url,
              url: org.html_url,
            })),
          },
          popularRepos,
          personalProjects,
          organizationProjects,
          repositoryCount: user.public_repos || repos.length,
          stars,
        }))
      } catch {
        setGithubData((prev) => ({ ...prev, loading: false, error: true }))
      }
    }

    setGithubData((prev) => ({ ...prev, loading: true, error: false }))
    loadMainGitHubData()
  }, [githubToken, githubUsername])

  useEffect(() => {
    const loadContributionsOnly = async () => {
      if (!githubToken) {
        setGithubData((prev) => ({
          ...prev,
          tokenMissing: true,
          contributions: 0,
          contributionWeeks: emptyContributionWeeks(),
          monthMarkers: [],
        }))
        return
      }

      try {
        const yearStart = new Date(selectedYear, 0, 1).toISOString()
        const yearEnd = new Date(selectedYear, 11, 31, 23, 59, 59).toISOString()

        const graphqlQuery = {
          query: `query($login: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $login) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionLevel
                      date
                    }
                  }
                }
              }
            }
          }`,
          variables: {
            login: githubUsername,
            from: yearStart,
            to: yearEnd,
          },
        }

        const graphqlRes = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${githubToken}`,
          },
          body: JSON.stringify(graphqlQuery),
        })

        if (!graphqlRes.ok) {
          throw new Error('Unable to fetch contribution calendar')
        }

        const graphqlData = await graphqlRes.json()
        const calendar = graphqlData?.data?.user?.contributionsCollection?.contributionCalendar
        const contributionData = getContributionDataFromCalendar(calendar, selectedYear)

        setGithubData((prev) => ({
          ...prev,
          tokenMissing: false,
          contributions: contributionData.contributions,
          contributionWeeks: contributionData.contributionWeeks,
          monthMarkers: contributionData.monthMarkers,
        }))
      } catch {
        setGithubData((prev) => ({
          ...prev,
          tokenMissing: false,
          contributions: 0,
          contributionWeeks: emptyContributionWeeks(),
          monthMarkers: [],
        }))
      }
    }

    loadContributionsOnly()
  }, [githubToken, githubUsername, selectedYear])

  return githubData
}
