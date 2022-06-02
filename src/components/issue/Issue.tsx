import { graphql, useFragment } from "react-relay"

type IssueProps = {
   issue: any 
}

const Issue = ({issue}: IssueProps) => {
    const data = useFragment(
        graphql`
            fragment Issue_node on Issue {
                repositoryAvatar
                repository
                title
                url
                labels
                commentCount
            }
        `, issue
    )
    return(
        <div className="flex flex-col p-6 rounded-lg shadow-lg hover:shadow-md bg-white">
            <a href={data.url} target="_blank" rel="noopener noreferrer">
                <div className="flex flex-row">
                    <img className="w-10 h-10 mt-3" src={data.repositoryAvatar} alt={data.title} />
                    <div className="flex flex-col ml-4">
                        <div className="">
                            <span className="font-bold text-xl">{data.repository}</span>
                        </div>
                        <div className="space-x-2">
                            {data.labels.map((label) => <span key={label} className="bg-blue-300 rounded-sm px-2 py-0.5">{label}</span>)}
                        </div>
                    </div>
                </div>
            </a>
            <div className="mt-2">
                <span className="text-l">{data.title}</span>
            </div>
        </div>
    )
}

export default Issue