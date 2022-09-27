import getTpl from './tpls';
import './index.scss';
import Component from '@/components/Component';
import { replaceTpl, setObjectToQuery } from '@/utils/tools';

const tpl = getTpl();

class InputRoute extends Component {
  constructor(options = {}) {
    super(options);
  }

  render() {
    const {
      pageName,
      query,
      placeholder = 'Please input something ...',
      prefix = '',
      bgColor = '#f6f6f6',
      showValue = '',
    } = this.props;

    const oContainer = document.createElement('div');
    oContainer.className = 'input-route J_InputRoute';
    oContainer.style.backgroundColor = bgColor;

    const innerHTML = replaceTpl(tpl, {
      pageName,
      query: setObjectToQuery(query),
      placeholder,
      prefix,
      showValue,
    });
    oContainer.innerHTML = innerHTML;

    return oContainer;
  }
}

export default InputRoute;
