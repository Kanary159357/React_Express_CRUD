const Index = () => {
	const Clicker = async () => {
		let value = await (await fetch('http://localhost:8000/')).text();
		console.log(value);
	};

	return <div onClick={Clicker}>Hi</div>;
};

export default Index;
