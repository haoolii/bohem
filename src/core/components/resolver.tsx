import { getShorten } from "../requests";


type Props = {
    uniqueId: string;
}

export const Resolver: React.FC<Props> = async ({ uniqueId }) => {
    const json = await getShorten(uniqueId)
    
    return <pre>
        {JSON.stringify(json, null, 2)}
    </pre>
}