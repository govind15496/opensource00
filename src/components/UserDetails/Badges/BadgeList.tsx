import { graphql, usePaginationFragment } from 'react-relay'
import { BadgeList_user$key } from '../../../queries/__generated__/BadgeList_user.graphql'
import Badge from './Badge'

const BadgeList = ({ user }: { user: BadgeList_user$key }) => {
  const { data, loadNext, hasNext } = usePaginationFragment(
    graphql`
      fragment BadgeList_user on User
      @refetchable(queryName: "BadgeList_userQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
        badges(first: $count, after: $cursor)
          @connection(key: "BadgeList__badges") {
          edges {
            node {
              id
              ...Badge_node
            }
          }
        }
      }
    `,
    user
  )

  if (!data || !data.badges) {
    return <></>
  }

  return (
    <div className="space-y-4">
      {data.badges.edges.map(
        (badge) => badge && <Badge key={badge.node.id} badge={badge.node} />
      )}
      {hasNext ? (
        <button
          className="text-gray-600 dark:text-gray-300"
          onClick={() => {
            loadNext(2)
          }}
        >
          Load more
        </button>
      ) : null}
    </div>
  )
}

export default BadgeList
