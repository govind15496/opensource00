import { NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import { graphql, usePreloadedQuery } from 'react-relay'
import { RelayProps, withRelay } from 'relay-nextjs'
import Layout from '../../components/Layout'
import { getClientEnvironment } from '../../lib/client_environment'
import { Id_StoryQuery } from '../../queries/__generated__/Id_StoryQuery.graphql'

const Editor = dynamic(() => import('../../components/story/StoryEditor'), {
  ssr: false,
})

const StoryQuery = graphql`
  query Id_StoryQuery($id: ID!) {
    node(id: $id) {
      ... on Story {
        id
        contentJson
      }
    }
  }
`

const Story = ({
  preloadedQuery,
}: RelayProps<Record<string, never>, Id_StoryQuery>) => {
  const query = usePreloadedQuery(StoryQuery, preloadedQuery)
  return (
    <div>
      <Layout
        sidebarContentRight={<div>Promoted</div>}
        sidebarContentLeft={<div>Reactions</div>}
      >
        <Editor body={query?.node?.contentJson} editable={false} />
      </Layout>
    </div>
  )
}

export default withRelay(Story, StoryQuery, {
  createClientEnvironment: () => getClientEnvironment()!,
  createServerEnvironment: async (ctx: NextPageContext) => {
    const { createServerEnvironment } = await import(
      '../../lib/server/server_environment'
    )

    return createServerEnvironment(ctx)
  },
})