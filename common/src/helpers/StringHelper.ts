export const formatArray = (arr: Array<string>, conjunction: string = 'and') => {
  if (!Array.isArray(arr)) {
    return ''
  }
  if (arr.length === 1) {
    return arr[0]
  } else if (arr.length === 2) {
    return `${arr[0]} ${conjunction} ${arr[1]}`
  } else {
    let result = arr[0]
    for (let i=1; i<arr.length; i++) {
      const item = arr[i]
      if (i < arr.length - 1) {
        result += `, ${item}`
      } else {
        result += `, ${conjunction} ${item}`
      }
    }
    return result
  }
}