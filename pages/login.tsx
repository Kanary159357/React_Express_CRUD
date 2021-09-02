import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoginBox = styled.div`
	width: 500px;
	height: 300px;
`;

const Login = () => {
	const onFinish = async (values: any) => {
		console.log(values);
		let data = await axios.post('http://localhost:8000/login', values);
		console.log(data);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<Wrapper>
			<LoginBox>
				<Form
					name='basic'
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<Form.Item
						label='Username'
						name='username'
						rules={[
							{ required: true, message: 'Please input your username!' },
						]}>
						<Input />
					</Form.Item>

					<Form.Item
						label='Password'
						name='password'
						rules={[
							{ required: true, message: 'Please input your password!' },
						]}>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name='remember'
						valuePropName='checked'
						wrapperCol={{ offset: 8, span: 16 }}>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</LoginBox>
		</Wrapper>
	);
};

export default Login;
