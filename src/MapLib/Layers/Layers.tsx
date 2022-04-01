import React from "react";

interface Props {
	children: React.ReactNode
}

const Layers = ({ children }: Props) => {
	return <div>{children}</div>;
};

export default Layers;