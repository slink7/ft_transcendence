

type Client = {
	name: string;
	color: string;
};

type Props = {
	client: Client;
	as?: keyof JSX.IntrinsicElements;
}

export default function NameTag({client, as = "span"}: Props) {
	const Tag = as;

	return (
		<Tag style={{color: client.color}}>
			{client.name}
		</Tag>
	);
}
