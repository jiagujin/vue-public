// element表单验证规则
export const $validator = {
  // 小数点前两位，小数点后两位，只能输入数字和'.'
  checkDigit(digit = 9, decimalDigit = 2, canNegative = false) {
    ///^(-)?[0-9]{1,9}([.][0-9]{1,2})?$/
    const reg = new RegExp(`^[0-9]{1,${digit}}([.][0-9]{1,${decimalDigit}})?$`)
    return {
      validator: (rule, value, callback) => {
        if (!reg.test(value)) {
          const errStr = `整数位最多${digit}位，小数位最多${decimalDigit}位`
          if (!value) return callback(new Error('不能为空'))
          if (!/^(-)?\d+(\.\d+)?$/.test(value))
            return callback(new Error('只能输入数字和“.”'))
          return callback(new Error(errStr))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  },

  comparePrice(num) {
    return {
      validator: (rule, value, callback) => {
        value < num ? callback(new Error('请输入正确的价格区间')) : callback()
      },
      trigger: 'blur'
    }
  },

  norequire() {
    return {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
        } else {
          if (!/^(-)?\d+(\.\d+)?$/.test(value))
            return callback(new Error('只能输入数字和“.”'))

          const reg = /^(-)?[0-9]{1,9}([.][0-9]{1,2})?$/
          !reg.test(value)
            ? callback(new Error(`整数位最多9位，小数位最多2位`))
            : callback()
        }
      },
      trigger: 'blur'
    }
  },

  mobile() {
    return {
      pattern: /^1\d{10}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  },

  notZero() {
    return {
      validator: (rule, value, callback) => {
        parseFloat(value) > 0 ? callback() : callback(new Error('不能为0'))
      },
      trigger: 'blur'
    }
  },

  require(opt) {
    if (!opt) {
      opt = { message: '不能为空', trigger: 'blur' }
    }
    if (typeof opt === 'string') {
      opt = { message: opt, trigger: 'blur' }
    }
    opt['validator'] = function(rule, value, callback) {
      value && value.toString().trim()
        ? callback()
        : callback(new Error('不能为空'))
    }
    opt['required'] = true
    return opt
  },

  requireNo() {
    return {
      validator: (rule, value, callback) => {
        !value
          ? value === 0
            ? callback(new Error('不能为0'))
            : callback(new Error('不能为空'))
          : callback()
      },
      trigger: 'blur'
    }
  },

  requireChange(opt) {
    if (!opt) {
      opt = { message: '不能为空', trigger: 'change' }
    }
    if (typeof opt === 'string') {
      opt = { message: opt, trigger: 'change' }
    }
    return { required: true, ...opt }
  },

  haveChinese() {
    return {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
        } else {
          const reg = /[\u4e00-\u9fa5]+/
          reg.test(value)
            ? callback(new Error(`不能输入汉字,只能输入数字或字母`))
            : callback()
        }
      },
      trigger: 'blur'
    }
  }
}
