import { Button } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { Descendant } from 'slate';
import styled from 'styled-components';
import RichEditor from '../../../component/RichEditor';
import MainLayout from '../../../Layout/MainLayout';
import Link from 'next/link';
const ControlDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 30px;
	margin-top: -30px;
`;

const Article = () => {
	const router = useRouter();
	const { id } = router.query;
	const text: Descendant[] = [
		{
			type: 'paragraph',
			children: [
				{
					text: '엄마 아빠 사랑해요라고 말하면 언제나 행복함이 잔뜩 올라오는 기분탓에 눈물이 차올라서 고개 들어 흐르지 못하게 또 살짝웃어',
				},
			],
		},
	];
	return (
		<MainLayout>
			<RichEditor readOnly text={text} title={'하루일기'} />
			<ControlDiv>
				<Button>
					<Link href={`${id}/edit`}>
						<a>수정</a>
					</Link>
				</Button>
				<Button>삭제</Button>
			</ControlDiv>
		</MainLayout>
	);
};

export default Article;
