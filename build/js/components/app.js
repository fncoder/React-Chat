'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _send = require('./send.js');

var _send2 = _interopRequireDefault(_send);

var _users = require('./users.js');

var _users2 = _interopRequireDefault(_users);

var _messages = require('./messages.js');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app = document.querySelector('#app');

var ChatApp = function (_React$Component) {
	_inherits(ChatApp, _React$Component);

	function ChatApp() {
		_classCallCheck(this, ChatApp);

		var _this = _possibleConstructorReturn(this, (ChatApp.__proto__ || Object.getPrototypeOf(ChatApp)).call(this));

		_this.state = {
			inputValue: '',
			messages: [],
			users: []
		};

		_this.sendMessage = _this.sendMessage.bind(_this);
		_this.updateValue = _this.updateValue.bind(_this);
		_this.sendMessage = _this.sendMessage.bind(_this);
		return _this;
	}

	_createClass(ChatApp, [{
		key: 'updateValue',
		value: function updateValue(e) {
			this.setState({
				inputValue: e.target.value
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.socket = new WebSocket('ws://localhost:8080');
			this.socket.onopen = function () {
				return _this2.onSocketOpen();
			};
			this.socket.onmessage = function (ev) {
				return _this2.onSocketData(ev);
			};
			this.socket.onclose = function (ev) {
				return _this2.onSocketClose();
			};
		}
	}, {
		key: 'onSocketOpen',
		value: function onSocketOpen() {
			var name = prompt('What is your name ?');

			if (name !== '') {
				this.socket.send(JSON.stringify({
					type: 'connection',
					joined: name
				}));
			}
		}
	}, {
		key: 'onSocketClose',
		value: function onSocketClose() {}
	}, {
		key: 'onSocketData',
		value: function onSocketData(ev) {
			var data = JSON.parse(ev.data);
			var newMessages = this.state.messages;

			if (data.type === 'connection') {
				newMessages.push(data);
				this.setState({
					users: data.connections,
					messages: newMessages
				});
			} else if (data.type === 'message') {
				newMessages.push(data);
				this.setState({
					messages: newMessages
				});
			} else if (data.type === 'close') {
				newMessages.push(data);
				this.setState({
					users: data.connections,
					messages: newMessages
				});
			}
		}
	}, {
		key: 'sendMessage',
		value: function sendMessage() {
			this.socket.send(JSON.stringify({
				type: 'message',
				msg: this.state.inputValue
			}));
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'wrapper' },
				React.createElement(
					'div',
					{ className: 'wrapper-app' },
					React.createElement(
						'p',
						{ className: 'text-chat' },
						'Live Chat'
					),
					React.createElement(_messages2.default, { list: this.state.messages,
						time: this.state.time,
						log: this.state.log
					}),
					React.createElement(_send2.default, { updateValue: this.updateValue,
						inputValue: this.state.inputValue,
						sendMessage: this.sendMessage
					})
				),
				React.createElement(_users2.default, { users: this.state.users })
			);
		}
	}]);

	return ChatApp;
}(React.Component);

ReactDOM.render(React.createElement(ChatApp, null), app);