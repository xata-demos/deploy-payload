type XataBranch = {
  id: string
  name: string
}

type XataBranchesResponse = {
  branches: XataBranch[]
}

type XataCredentialsResponse = {
  connectionString: string
}

const requireEnvironmentVariable = (name: string, value?: string): string => {
  if (!value) {
    throw new Error(`Missing ${name} for Xata preview database resolution`)
  }

  return value
}

export const resolveDatabaseURL = async (): Promise<string> => {
  if (process.env.VERCEL_ENV !== 'preview') {
    return process.env.DATABASE_URL || ''
  }

  const branchName = requireEnvironmentVariable(
    'VERCEL_GIT_COMMIT_REF',
    process.env.VERCEL_GIT_COMMIT_REF,
  )
  const apiKey = requireEnvironmentVariable('XATA_API_KEY', process.env.XATA_API_KEY)
  const organizationID = requireEnvironmentVariable(
    'XATA_ORGANIZATION_ID',
    process.env.XATA_ORGANIZATION_ID,
  )
  const projectID = requireEnvironmentVariable('XATA_PROJECT_ID', process.env.XATA_PROJECT_ID)
  const projectPath = `/organizations/${encodeURIComponent(organizationID)}/projects/${encodeURIComponent(projectID)}`
  const configuredURL = requireEnvironmentVariable('DATABASE_URL', process.env.DATABASE_URL)
  let databasePath: string

  try {
    databasePath = new URL(configuredURL).pathname
  } catch {
    throw new Error('Invalid DATABASE_URL for Xata preview database resolution')
  }

  const request = async <ResponseBody>(path: string): Promise<ResponseBody> => {
    const response = await fetch(`https://api.xata.tech${path}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error(
        `Xata API request failed while resolving preview database (${response.status} ${response.statusText})`,
      )
    }

    return (await response.json()) as ResponseBody
  }

  const { branches } = await request<XataBranchesResponse>(`${projectPath}/branches`)
  const branch = branches.find(({ name }) => name === branchName)

  if (!branch) {
    throw new Error(`Xata branch ${JSON.stringify(branchName)} was not found`)
  }

  const { connectionString } = await request<XataCredentialsResponse>(
    `${projectPath}/branches/${encodeURIComponent(branch.id)}/credentials?username=xata`,
  )

  if (!connectionString) {
    throw new Error(`Xata returned no connection string for branch ${JSON.stringify(branchName)}`)
  }

  const databaseURL = new URL(connectionString)
  databaseURL.pathname = databasePath
  databaseURL.searchParams.set('sslmode', 'require')

  return databaseURL.toString()
}
