const router = require('koa-router')();
var Mock = require('mockjs');
var Random = Mock.Random;
router.prefix('/mock');

router.get(
  '/qms-spc/sampling/qms-spc-task-sampling/equipment/history',
  async (ctx, next) => {
    const result = {
      code: 1,
      data: Mock.mock({
        rows: [
          {
            index: 0,
            cells: [
              {
                data: { value: '时间' },
              },
              {
                data: { value: '分析项目' },
              },
            ],
          },
        ],

        'rows|100': [
          {
            'index|+1': 1,
            cells: [
              {
                data: { value: Random.date('yyyy-MM-dd HH:ss:mm') },
              },
              {
                data: { 'value|1-100': 45 },
                'index|+1': 1,
              },
            ],
          },
        ],
      }),
      msg: null,
    };
    ctx.response.body = result;
  }
);

router.get(
  '/qms-spc/sampling/qms-spc-task-sampling/equipment/current',
  async (ctx, next) => {
    console.log(ctx.query);
    const { lastIndex } = ctx.query;
    const result = Mock.mock({
      code: 1,
      data: {
        'rows|0-100': [
          {
            'index|+1': parseInt(lastIndex) + 1,
            cells: [
              {
                data: { value: Random.date('yyyy-MM-dd HH:ss:mm') },
              },
              {
                data: { 'value|1-100': 45 },
                'index|+1': parseInt(lastIndex) + 1,
              },
            ],
          },
        ],
      },
      msg: null,
    });
    ctx.response.body = result;
  }
);

router.get('/history', async (ctx, next) => {
  const result = Mock.mock({
    code: 1,
    'data|100': [
      {
        'time|Random.date("yyyy-MM-dd HH:ss:mm")': Random.date(
          'yyyy-MM-dd HH:ss:mm'
        ),
        'value|1-100': 45,
      },
    ],
    msg: null,
  });
  ctx.response.body = result;
});

module.exports = router;
