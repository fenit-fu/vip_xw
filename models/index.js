module.exports = (mongoose) => {
  const IndexCarouseSchema = mongoose.Schema({
    title: {type: String, comment: '标题'},
    imgUrl: {type: String, comment: '图片地址'},
    targetUrl: {type: String, comment: '连接地址'},
  }, {
    autoIndex: false,
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'update_at'
    }
  })
  IndexCarouseSchema.index({name: 1})
  return {
    carouse: mongoose.model('carouse', IndexCarouseSchema)
  }

}
