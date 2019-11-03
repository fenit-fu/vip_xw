const moment = require('moment')
// const validator = require('validator')

module.exports = (app) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const ObjectId = Schema.ObjectId

  let AccountSchema = new Schema({
    mobile: {
      type: String,
      comment: '用户手机号码'
    },

    wechat: {
      unionId: {type: String},
      openIds: {
        match: {type: String},
        emall: {type: String},
        wxEleven: {type: String},
        wxNewYear2019: {type: String},
        careerTest: {type: String}
      },
      nickName: {type: String},
      avatarUrl: {type: String},
    },

    coin: {type: Number, comment: '币数', default: 0},

    WXAppletSource: {type: String},

    WXAppletShareSponsor: {type: String},

    WXAppletShareSourceType: {type: String},

    zeroYuanActivity: {type: Boolean, default: false},

    phonenumber: {type: String},
    mobile_code: {type: String, comment: ''},
    is_phonenumber_verified: {type: Boolean, default: false, comment: ''},

    email: {type: String},
    is_email_verified: {type: Boolean, default: false, comment: ''},

    password: {type: String},

    qq: {type: Number, comment: ''},
    wechat_account: {type: String, comment: ''},

    is_internal_user: {type: Boolean, comment: '测试账户etc...'},

    // for backward compatibility, we create two fields here.
    role: {type: String, default: 'user'},
    // for partner role, the sub role could be PEM or AP: 机构合作方, IP: 个人合作方, TCM: 一级渠道
    sub_roles: [String],

    displayname: {type: String},
    nationality: {type: String, default: 'China PRC', comment: '国籍'},
    create_at: {type: Date, default: Date.now, comment: ''},
    update_at: {type: Date, default: Date.now, comment: ''},
    access_at: {type: Date, default: Date.now, comment: ''},

    sync_CRM_at: {type: Date, comment: ''},
    CRM_id: {type: String, comment: ''},

    access_agent: {type: String, comment: ''},
    register_agent: {type: String, comment: ''},

    access_ip: {type: String, comment: ''},

    portrait_file_location: {type: String, comment: ''},

    agreement: {type: Boolean, default: false, comment: ''},

    organization: {type: String, comment: ''},

    partner_phonenumber: {type: String, comment: ''},
    partner_code: {type: String, comment: ''},
    partner_account: {type: ObjectId, index: true, ref: 'Account', comment: ''},
    group_partner_account: {type: ObjectId, index: true, ref: 'Account', comment: ''},
    parent_partner: {type: ObjectId, index: true, ref: 'Account', comment: ''},

    source: {type: String, default: 'local', comment: ''},
    tags: [
      {type: String, ref: 'AccountTag', comment: ''}
    ],

    valid: {type: Boolean, comment: ''},

    applied: {type: Boolean, comment: 'dup field for performance.'},

    // 会员级别
    service_level: {
      level_id: {type: Number, comment: '会员类型ID.'},
      paid_sku_id: {type: ObjectId, comment: '对应的购买的产品SKU，可能是升级包的SKU.'},
      to_sku_id: {type: ObjectId, comment: '和level_id相对应的SKU.'},
      create_at: {type: Date, comment: ''},
      order_id: {type: String, comment: 'for reference only.'}
    },
    member_level: {type: Number, default: 0, comment: '会员等级、1:普通, 2:尊享'},

    // for PEM.
    sign_name: {type: String, comment: '姓名'},
    sign_id: {type: String, comment: '身份证号'},
    pem_sign: {type: Boolean, comment: ''},
    pem_offline_sign: {type: Boolean, comment: '是否签了线下合同'},
    pem_comments: {type: String, comment: 'PEM备注信息'},
    pem_maintainer: {type: String, comment: 'PEM维护人员'},
    is_pep: {type: Boolean, comment: '企业合作伙伴,只能放在一级pem下，默认不能作为partner的parent.'},
    has_pep_exception: {type: Boolean, comment: '可以作为partner的parent'},

    prefer_language: {type: String, default: 'zh-cn', comment: 'app language preference.'},
    push_at: {type: Date, comment: '上次推送时间'},

    // for mentor
    service_category: [
      {type: String, ref: 'MentorServiceCategory', comment: ''}
    ],

    publish_state: {type: Number, default: 0, comment: '发布状态 0 未发布 1 发布'},

    background_desc: {type: String, comment: '背景描述'},
    background_doc: [
      {type: String, comment: '背景材料, 图片形式, 如毕业证书之类的'}
    ],

    country: {type: String, comment: ''},
    state: {type: String, comment: ''},
    school: {type: String, comment: '学校'},
    college: {type: String, comment: '院系'},

    mentor_type: {type: String, default: 'myoffer', comment: '导师的类型, head, 个人 个人-商家'},

    register_android_market: {type: String, comment: 'the market code.'},

    collision_phonenumber: {type: String, comment: 'the collision info.'},

    emall_special: {type: Boolean, default: false, comment: ''},

    // 优惠券
    couponList: [{
      cid: {type: ObjectId, comment: ''},
      name: {type: String, comment: ''},
      rules: {type: Number, comment: ''},
      start_time: {type: Date, comment: ''},
      end_time: {type: Date, comment: ''},
      state: {type: Number, comment: ''}
    }],

    // 推荐系统奖励
    parent_id: {type: ObjectId, ref: 'Account', comment: '推荐人id'},
    promotion_state: {
      type: String,
      comment: '推荐状态',
      enum: ['registered', 'recommend_success', 'recommend_failed', 'emall_bought', 'award_issued']
    },
    promotion_award: {type: String, comment: '推荐奖励'},
    promotion_state_history: {type: String, comment: '推荐状态变更历史'},
    cash_apply_state: {type: String, comment: '提现状态', enum: ['init', 'processing', 'success', 'failed']}
  }, {
    autoIndex: false
  })

  // 60s以内注册的用户
  AccountSchema.methods.isRecentlyRegistered = function () {
    return moment().diff(moment(this._id.getTimestamp()), 'seconds') < 60
  }

  AccountSchema.index({phonenumber: 1}, {unique: true, sparse: true})
  AccountSchema.index({email: 1}, {unique: true, sparse: true})
  AccountSchema.index({partner_code: 1}, {unique: true, sparse: true})
  AccountSchema.index({parent_id: 1})

  return mongoose.model('Account', AccountSchema)
}
