import React, { Component } from "react";
import Portal from "./Portal.jsx";
import "../css/modal.css";

import { FiX } from "react-icons/fi";

export default class Modal extends Component {
	render() {
		const { children, toggle, active } = this.props;

		return (
			<Portal>
				{active && (
					<div className="modal-wrapper">
						<div className="modal-window">
							<div className="modal-btn-close" onClick={toggle}>
								<FiX />
							</div>
							{children}
						</div>
						<div className="modal-background" onClick={toggle}></div>
					</div>
				)}
			</Portal>
		);
	}
}
