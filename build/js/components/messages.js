"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Messages = function (_React$Component) {
	_inherits(Messages, _React$Component);

	function Messages() {
		_classCallCheck(this, Messages);

		return _possibleConstructorReturn(this, (Messages.__proto__ || Object.getPrototypeOf(Messages)).apply(this, arguments));
	}

	_createClass(Messages, [{
		key: "render",
		value: function render() {
			var changelog = this.props.list.map(function (list) {
				return React.createElement(
					"li",
					{ className: "message" },
					React.createElement(
						"p",
						{ className: "date" },
						React.createElement(
							"span",
							null,
							list.nickname
						),
						React.createElement(
							"span",
							null,
							list.time
						)
					),
					React.createElement(
						"p",
						{ className: "text" },
						React.createElement(
							"span",
							{ className: "joined" },
							list.status,
							list.joined
						),
						list.msg
					)
				);
			});
			/*
   let changelog = this.props.list.map(list => 
   					<li className="message">
   						<div className="joined">
   							{list.status}{list.joined}
   						</div>
   						<span>{list.nickname}</span>{list.msg} <span>{list.time}</span>
   					</li>
   				)
   */

			return React.createElement(
				"div",
				{ className: "content" },
				React.createElement(
					"ul",
					{ className: "content-list" },
					changelog
				)
			);
		}
	}]);

	return Messages;
}(React.Component);

exports.default = Messages;