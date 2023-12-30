interface MatchListProps {
    data: MatchFinderTableProps[],
}
interface MatchFinderTableProps {
    first_name: string,
    last_name: string,
    id: number
}

// interface MatchFinderTableProps extends Array<MatchFinderTableProps>{}

export const MatchFinderTable = ({data}: MatchListProps) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                </tr>
                {data.map(({first_name, last_name, id}) => (
                    <tr key={id}>
                        <td>{first_name}</td>
                        <td>{last_name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}