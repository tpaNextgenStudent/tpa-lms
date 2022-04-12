import axios from 'axios';
import { apiPath } from '../../lib/utils/apiPath';
export default function Test() {
  return (
    <button
      onClick={() => {
        axios.post(
          apiPath('teacher/assess/attempt/cl1t3wgef0479bxs6o2wi6dk9'),
          { score: 3, comment: '333comment' }
        );
      }}
    >
      ASSESS
    </button>
  );
}
