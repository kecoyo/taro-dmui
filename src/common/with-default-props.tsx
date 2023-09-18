import _ from 'lodash';

function mergeProps<A, B>(a: A, b: B): B & A;
function mergeProps<A, B, C>(a: A, b: B, c: C): C & B & A;
function mergeProps(...items: any[]) {
  function customizer(objValue: any, srcValue: any) {
    return srcValue === undefined ? objValue : srcValue;
  }

  let ret = { ...items[0] };
  for (let i = 1; i < items.length; i++) {
    ret = _.assignWith(ret, items[i], customizer);
  }
  return ret;
}

export default mergeProps;