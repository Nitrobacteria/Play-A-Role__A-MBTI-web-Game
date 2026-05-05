// ========== 主要事件（会进入随机池）==========
const MAIN_EVENTS = [
    // ========== ENFP - 热情洋溢的灵感发电机 ==========
    {
        id: "enfp_1",
        title: "ENFP",
        desc: "我刚想到一个超棒的点子——在天台搞个露天电影院！摆上懒人沙发和串灯，吹着晚风看电影，是不是超浪漫？",
        image: "Resources/images/card/ENFP/ENFP_1.jpg",
        choiceA: {
            text: "天哪这想法绝了！我现在就去群里喊人，今晚就搞起来！",
            effects: { ie: +4 },
            nextEventId: null
        },
        choiceB: {
            text: "露天太麻烦了，蚊虫多风又大，还是在家用投影仪看吧。",
            effects: { ie: -4 },
            nextEventId: null
        }
    },
    {
        id: "enfp_2",
        title: "ENFP",
        desc: "昨晚我盯着天花板突然想到——如果时间其实是个圈，那我们现在做的每一个选择，是不是都已经发生过无数次了？",
        image: "Resources/images/card/ENFP/ENFP_1.jpg",
        choiceA: {
            text: "哇这个问题能聊一整夜！你觉得不同的选择会分叉出平行宇宙吗？",
            effects: { ns: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "想这个干嘛，明天还要早起上班呢，快睡吧。",
            effects: { ns: +4 },
            nextEventId: null
        }
    },
    {
        id: "enfp_3",
        title: "ENFP",
        desc: "楼下新来的咖啡师好像特别紧张，手都在抖。我们点单的时候多夸夸他吧？",
        image: "Resources/images/card/ENFP/ENFP_1.jpg",
        choiceA: {
            text: "好啊，给新人一点鼓励。每个人都是从紧张过来的嘛。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "没必要刻意吧，他手艺确实还不行，夸了反而是误导。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },

    // ========== INFP - 安静细腻的内心诗人 ==========
    {
        id: "infp_1",
        title: "INFP",
        desc: "刚才路过街角，看到一只蜗牛在雨后的人行道上慢慢爬。它背着小房子想去哪里呢？",
        image: "Resources/images/card/INFP/INFP_1.jpg",
        choiceA: {
            text: "也许它心里装着一个小小的目的地。这种慢悠悠的坚持，莫名让人感动。",
            effects: { ft: -5 },
            nextEventId: null
        },
        choiceB: {
            text: "就一只蜗牛而已……你走路看路，别踩到就行。",
            effects: { ft: +5 },
            nextEventId: null
        }
    },
    {
        id: "infp_2",
        title: "INFP",
        desc: "我写了首小诗，关于一棵树和一朵云的对话。虽然可能有点幼稚……你想听吗？",
        image: "Resources/images/card/INFP/INFP_1.jpg",
        choiceA: {
            text: "树和云对话？这个设定好温柔，快念给我听！",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "树和云怎么对话……我不太懂诗，你自己留着吧。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },
    {
        id: "infp_3",
        title: "INFP",
        desc: "如果你现在可以变成森林里的一种动物，你会选什么？我想当一只安静的鹿。",
        image: "Resources/images/card/INFP/INFP_1.jpg",
        choiceA: {
            text: "我想当只鸟，飞过树梢看遍山谷。不过鹿也很好，温柔又警觉。",
            effects: { ns: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "变成动物又不能赚钱，想这些干嘛？现实点。",
            effects: { ns: +4 },
            nextEventId: null
        }
    },

    // ========== INTJ - 冷静的战略规划者 ==========
    {
        id: "intj_1",
        title: "INTJ",
        desc: "我分析了你的时间分配，发现碎片化任务占了60%。如果把其中80%集中批处理，每天能多出两小时。要试试吗？",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "有道理，给我看看具体方案。能优化的地方就该优化。",
            effects: { ns: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "太机械了，有些事就得随性做才有感觉，不用规划那么死。",
            effects: { ns: +4 },
            nextEventId: null
        }
    },
    {
        id: "intj_2",
        title: "INTJ",
        desc: "咱们组的工作流程里有三个节点完全可以砍掉。这是简化方案，执行后效率能提升40%。",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "干净利落。按这个来，能提高效率的改动我一向支持。",
            effects: { jp: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "流程再简化也太激进了，留点弹性不好吗？万一有特殊情况呢。",
            effects: { jp: +4 },
            nextEventId: null
        }
    },
    {
        id: "intj_3",
        title: "INTJ",
        desc: "你最近在做的那件事，长远来看回报不高。我建议现在止损，把精力投到另一个方向。",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "冷静地看确实如此。虽然有点不甘心，但数据不会骗人。",
            effects: { ns: -3, jp: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "但这件事对我有意义，不是所有东西都要算回报率的。",
            effects: { ft: -4 },
            nextEventId: null
        }
    },

    // ========== INTP - 逻辑的深层探索者 ==========
    {
        id: "intp_1",
        title: "INTP",
        desc: "如果一个AI说它很痛苦，我们凭什么判断它是真的痛苦还是在模拟痛苦？昨晚想这个问题想到了凌晨四点。",
        image: "Resources/images/card/INTP/INTP_1.jpg",
        choiceA: {
            text: "先把'痛苦'的定义拆开——生理信号、行为表现、还是主观感受？这是个好问题。",
            effects: { ns: -5 },
            nextEventId: null
        },
        choiceB: {
            text: "AI怎么会痛苦，你在想这些的时候不如多睡会儿觉。",
            effects: { ns: +5 },
            nextEventId: null
        }
    },
    {
        id: "intp_2",
        title: "INTP",
        desc: "这个系统底层有个逻辑死循环，在极端情况下会触发。虽然概率只有0.03%，但它存在。",
        image: "Resources/images/card/INTP/INTP_1.jpg",
        choiceA: {
            text: "0.03%也值得深挖。把触发条件推演一遍，看看有没有连锁风险。",
            effects: { ns: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "0.03%？那等发生再说吧，我真不想为这种事费脑子。",
            effects: { ns: +4 },
            nextEventId: null
        }
    },
    {
        id: "intp_3",
        title: "INTP",
        desc: "周末有什么安排？我准备一个人窝着，把之前买的那本拓扑学翻完。",
        image: "Resources/images/card/INTP/INTP_1.jpg",
        choiceA: {
            text: "我的周末也是独处充电，安安静静看本书是最舒服的状态。",
            effects: { ie: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "又宅着？出来吃烧烤啊，人多热闹才有意思！",
            effects: { ie: +4 },
            nextEventId: null
        }
    },

    // ========== ENTJ - 果断的铁腕领袖 ==========
    {
        id: "entj_1",
        title: "ENTJ",
        desc: "你的能力远远超过你现在做的事。下周的汇报，我建议你直接上台，别总放低姿态。",
        image: "Resources/images/card/ENTJ/ENTJ_1.jpg",
        choiceA: {
            text: "你说得对，不该再藏着了。我会准备好，这次站到前面去。",
            effects: { ie: +4 },
            nextEventId: null
        },
        choiceB: {
            text: "我还是习惯低调一点，太多目光盯着我会不自在。",
            effects: { ie: -4 },
            nextEventId: null
        }
    },
    {
        id: "entj_2",
        title: "ENTJ",
        desc: "这是下个月的时间线和关键节点。分工和截止日期都标好了，没有异议就开始执行。",
        image: "Resources/images/card/ENTJ/ENTJ_1.jpg",
        choiceA: {
            text: "目标明确，我喜欢这种有节奏的推进方式。按时间表走。",
            effects: { jp: -5 },
            nextEventId: null
        },
        choiceB: {
            text: "排得太满了，万一中间冒出别的事呢？留点灵活余地行不行。",
            effects: { jp: +5 },
            nextEventId: null
        }
    },
    {
        id: "entj_3",
        title: "ENTJ",
        desc: "谈判对手有三个弱点，我已经整理好了对策。先模拟一轮，把他们的退路封死。",
        image: "Resources/images/card/ENTJ/ENTJ_1.jpg",
        choiceA: {
            text: "好，直接进入实战推演。把各种可能性都准备好。",
            effects: { ie: +3, jp: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "也别太快把人逼到死角，留点人情余地反而好谈。",
            effects: { ft: -3 },
            nextEventId: null
        }
    },

    // ========== ENFJ - 温暖的共同成长引领者 ==========
    {
        id: "enfj_1",
        title: "ENFJ",
        desc: "你最近好像话变少了。是不是遇到什么事了？不用非得说，但如果你想聊，我随时都在。",
        image: "Resources/images/card/ENFJ/ENFJ_1.jpg",
        choiceA: {
            text: "谢谢你注意到……确实有点堵心的事，有人愿意听真的很好。",
            effects: { ft: -5 },
            nextEventId: null
        },
        choiceB: {
            text: "没什么好聊的，就工作上的事，我能自己消化。",
            effects: { ft: +5 },
            nextEventId: null
        }
    },
    {
        id: "enfj_2",
        title: "ENFJ",
        desc: "我看到团队里有个伙伴连续加班一周了。虽然他没说，但我觉得该主动问问他需不需要分担。",
        image: "Resources/images/card/ENFJ/ENFJ_1.jpg",
        choiceA: {
            text: "去吧，有时一句简单的关心比什么都重要。团队需要这种温度。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "他既然没说就是不想要帮忙，别擅自揣测别人的情况。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },
    {
        id: "enfj_3",
        title: "ENFJ",
        desc: "晚上有个分享会，讲的是普通人怎么用自己擅长的事帮到别人。我觉得你会喜欢，一起去？",
        image: "Resources/images/card/ENFJ/ENFJ_1.jpg",
        choiceA: {
            text: "非常有兴趣！在自己擅长的领域顺带帮人一把，本来就是最好的事。",
            effects: { ft: -3, ie: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "最近太忙了，自己的事都搞不定，哪有精力帮别人。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },

    // ========== ISTJ - 可靠的传统守护者 ==========
    {
        id: "istj_1",
        title: "ISTJ",
        desc: "我把过去两年的考勤记录整理好了，发现第三季度迟到率有周期性上升。建议提前调整班车时间。",
        image: "Resources/images/card/ISTJ/ISTJ_1.jpg",
        choiceA: {
            text: "数据做得很扎实，有具体方案就按这个提交审批吧。",
            effects: { jp: -5 },
            nextEventId: null
        },
        choiceB: {
            text: "两年前的数据也翻出来……没必要这么较真吧？",
            effects: { jp: +5 },
            nextEventId: null
        }
    },
    {
        id: "istj_2",
        title: "ISTJ",
        desc: "你的报销单上有一张发票抬头开错了。我已经帮你找了财务申请重开，下次注意一下就好。",
        image: "Resources/images/card/ISTJ/ISTJ_1.jpg",
        choiceA: {
            text: "谢谢，多亏你细心。下次我会仔细核对。",
            effects: { jp: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "就一张发票，金额也不大，不够严谨一点也没关系吧。",
            effects: { jp: +4 },
            nextEventId: null
        }
    },
    {
        id: "istj_3",
        title: "ISTJ",
        desc: "会议室的设备经常用完没人关，我写了份使用守则贴在门上。你帮我看下有没有漏的。",
        image: "Resources/images/card/ISTJ/ISTJ_1.jpg",
        choiceA: {
            text: "很详细，规矩立好了大家才清楚。我支持这种规范化。",
            effects: { jp: -3, ft: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "真的需要这么细吗？用完随手关一下就好了，不用写守则吧。",
            effects: { jp: +3 },
            nextEventId: null
        }
    },

    // ========== ISFJ - 默默守护的温柔力量 ==========
    {
        id: "isfj_1",
        title: "ISFJ",
        desc: "这两天降温了，你工位空调口对着吹，我给你带了条毯子。干净的，你先用着。",
        image: "Resources/images/card/ISFJ/ISFJ_1.jpg",
        choiceA: {
            text: "你总是这么细心……盖上确实暖和多了，谢谢。",
            effects: { ft: -5 },
            nextEventId: null
        },
        choiceB: {
            text: "我不冷，不用这样。这点小事真的不用操心。",
            effects: { ft: +5 },
            nextEventId: null
        }
    },
    {
        id: "isfj_2",
        title: "ISFJ",
        desc: "上次你带的那个实习生转正了，他让我转告说特别感谢你当时耐心带他。真替你开心。",
        image: "Resources/images/card/ISFJ/ISFJ_1.jpg",
        choiceA: {
            text: "听到这个比我自己加薪还高兴。能帮到人就是最大的回报了。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "哦，转正了？他自己努力的结果，跟我关系不大。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },
    {
        id: "isfj_3",
        title: "ISFJ",
        desc: "我做了一些曲奇饼干，样子不太好看，但味道还可以……给你拿了几块尝尝。",
        image: "Resources/images/card/ISFJ/ISFJ_1.jpg",
        choiceA: {
            text: "好好吃！比外面卖的还好，你也太会烘焙了吧。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "我在控糖，就不吃了。谢谢你的心意。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },

    // ========== ESTJ - 雷厉风行的执行者 ==========
    {
        id: "estj_1",
        title: "ESTJ",
        desc: "这周的进度慢了。我重新拆了目标，你需要优先搞定这三个方向。有困难说，没有就执行。",
        image: "Resources/images/card/ESTJ/ESTJ_1.jpg",
        choiceA: {
            text: "收到，目标很清晰。我今天下午就开始推进第一个。",
            effects: { jp: -5 },
            nextEventId: null
        },
        choiceB: {
            text: "别一上来就下指令行吗？我需要一点缓冲和讨论的空间。",
            effects: { jp: +5 },
            nextEventId: null
        }
    },
    {
        id: "estj_2",
        title: "ESTJ",
        desc: "你处理邮件的时间太长。我的方法是按紧急度分三档清空，强制执行，试一周效果就出来了。",
        image: "Resources/images/card/ESTJ/ESTJ_1.jpg",
        choiceA: {
            text: "行，效率低就该改。你把分档标准发我，我这就执行。",
            effects: { jp: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "我的节奏我自己清楚，不需要大家都按一种模式来。",
            effects: { jp: +4 },
            nextEventId: null
        }
    },
    {
        id: "estj_3",
        title: "ESTJ",
        desc: "别磨蹭了！临时来了个重要客户，整理一下桌面和思路，我们马上进入状态。",
        image: "Resources/images/card/ESTJ/ESTJ_1.jpg",
        choiceA: {
            text: "收到，随时可以开干。突击任务我也能应付。",
            effects: { ie: +3, jp: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "你能不能别一惊一乍的，安排事情就不能温和一点吗。",
            effects: { ie: -4 },
            nextEventId: null
        }
    },

    // ========== ESFJ - 热情的社交纽带 ==========
    {
        id: "esfj_1",
        title: "ESFJ",
        desc: "这周五我们组有同事要离职了！我正在准备惊喜欢送会，气球和蛋糕我已经订好了，你帮忙写个祝福卡片吧？",
        image: "Resources/images/card/ESFJ/ESFJ_1.jpg",
        choiceA: {
            text: "哇好用心！我来写卡片，走的时候一定要让他感觉被大家爱着。",
            effects: { ie: +5 },
            nextEventId: null
        },
        choiceB: {
            text: "离职就是换家公司而已，搞这么大场面有点太过了吧。",
            effects: { ie: -5 },
            nextEventId: null
        }
    },
    {
        id: "esfj_2",
        title: "ESFJ",
        desc: "你今天脸色不太好，是不是没好好吃饭？我抽屉里有牛奶和面包，你拿去垫垫肚子。",
        image: "Resources/images/card/ESFJ/ESFJ_1.jpg",
        choiceA: {
            text: "太周到了，你一提醒才发现自己真的饿了。谢谢。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "我自己会照顾自己，不用老是为我操心。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },
    {
        id: "esfj_3",
        title: "ESFJ",
        desc: "公司短视频大赛我们组还差三个赞就能反超第一！快转发到朋友圈摇人，冲一冲！",
        image: "Resources/images/card/ESFJ/ESFJ_1.jpg",
        choiceA: {
            text: "哈哈好燃！我马上去发动我的人脉，争取拿下！",
            effects: { ie: +4 },
            nextEventId: null
        },
        choiceB: {
            text: "这种比赛名次没那么重要吧，自己玩得开心就好了。",
            effects: { ie: -4 },
            nextEventId: null
        }
    },

    // ========== ESTP - 活在当下的冒险家 ==========
    {
        id: "estp_1",
        title: "ESTP",
        desc: "周末室内攀岩馆有活动，听说新线路特别刺激！别想太多，直接报名就完了。",
        image: "Resources/images/card/ESTP/ESTP_1.jpg",
        choiceA: {
            text: "走！好久没运动了，手脚早就痒，正好发泄一下。",
            effects: { ie: +5 },
            nextEventId: null
        },
        choiceB: {
            text: "攀岩太危险了，万一摔了怎么办。我还是在家待着舒服。",
            effects: { ie: -5 },
            nextEventId: null
        }
    },
    {
        id: "estp_2",
        title: "ESTP",
        desc: "南街那边新开了一家烤串店，肉是现切的。口水都要下来了，今晚直接杀过去？",
        image: "Resources/images/card/ESTP/ESTP_1.jpg",
        choiceA: {
            text: "行啊，说走就走。正好饿了，现在就出发！",
            effects: { ie: +4 },
            nextEventId: null
        },
        choiceB: {
            text: "太临时了吧，而且大晚上吃烧烤不健康。明天再说。",
            effects: { ie: -4 },
            nextEventId: null
        }
    },
    {
        id: "estp_3",
        title: "ESTP",
        desc: "别纠结了，这bug先搞个热修复怼上去，客户那边能用了再说。完美是无底洞。",
        image: "Resources/images/card/ESTP/ESTP_1.jpg",
        choiceA: {
            text: "说得对，先止血。线上等不起，后面再慢慢优化。",
            effects: { jp: +4 },
            nextEventId: null
        },
        choiceB: {
            text: "不行，热修复会留下隐性bug。我还是得从根上理清楚再动。",
            effects: { jp: -4 },
            nextEventId: null
        }
    },

    // ========== ESFP - 闪耀的中心舞台表演者 ==========
    {
        id: "esfp_1",
        title: "ESFP",
        desc: "年会我准备跳宅舞！服装和伴奏都选好了，你现在先帮我看看第一个八拍怎么样？",
        image: "Resources/images/card/ESFP/ESFP_1.jpg",
        choiceA: {
            text: "跳起来！你就是天生该上台的人，年会最佳节目预定了！",
            effects: { ie: +5 },
            nextEventId: null
        },
        choiceB: {
            text: "你胆子真大……台下那么多人盯着，你不紧张吗？",
            effects: { ie: -5 },
            nextEventId: null
        }
    },
    {
        id: "esfp_2",
        title: "ESFP",
        desc: "我发现一家超有风格的复古服装店，里面全是上世纪的oversize西装！走，去试试拍拍照也好啊！",
        image: "Resources/images/card/ESFP/ESFP_1.jpg",
        choiceA: {
            text: "复古西装！光想想就很有趣，走，我帮你参谋。",
            effects: { ie: +4 },
            nextEventId: null
        },
        choiceB: {
            text: "试半天又不买多不好意思，这种店逛逛看就行了。",
            effects: { ie: -4 },
            nextEventId: null
        }
    },
    {
        id: "esfp_3",
        title: "ESFP",
        desc: "失恋了是吧？不许愁眉苦脸。今晚KTV我请，把那些破事全吼出来。",
        image: "Resources/images/card/ESFP/ESFP_1.jpg",
        choiceA: {
            text: "对！憋着不如喊出来，痛快哭一场也比闷着强。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "难过也要有个过程，强行打鸡血反而假了。让我安安静静待着就好。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },

    // ========== ENTP - 机智的辩论鬼才 ==========
    {
        id: "entp_1",
        title: "ENTP",
        desc: "我发现一个巨搞笑的悖论——如果规定'所有人都必须打破一条规定'，那遵守它就是在打破它？脑子要转不过来了。",
        image: "Resources/images/card/ENTP/ENTP_1.jpg",
        choiceA: {
            text: "哈哈这个好有意思！这正是罗素悖论的变体，我们顺着逻辑推一遍。",
            effects: { ns: -5 },
            nextEventId: null
        },
        choiceB: {
            text: "绕来绕去有什么意义？这种事想想都头大，跳过跳过。",
            effects: { ns: +5 },
            nextEventId: null
        }
    },
    {
        id: "entp_2",
        title: "ENTP",
        desc: "如果把公司比作一个游戏，你觉得我们现在是在玩《我的世界》还是在玩《黑魂》？我投黑魂一票。",
        image: "Resources/images/card/ENTP/ENTP_1.jpg",
        choiceA: {
            text: "精辟！每天都是高难度生存但死不了——这个比喻我能聊一小时！",
            effects: { ns: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "上班就是上班，别老扯游戏。能不能正经聊点工作？",
            effects: { ns: +4 },
            nextEventId: null
        }
    },
    {
        id: "entp_3",
        title: "ENTP",
        desc: "下班了，走，去那家新开的桌游吧杀几盘狼人杀。让我拿狼人牌，看我能不能说服所有人。",
        image: "Resources/images/card/ENTP/ENTP_1.jpg",
        choiceA: {
            text: "奉陪！我看你能不能骗过我，上次你可输得挺惨。",
            effects: { ie: +4 },
            nextEventId: null
        },
        choiceB: {
            text: "下班还要跟人辩论，太累了。我选择回家躺着。",
            effects: { ie: -4 },
            nextEventId: null
        }
    },

    // ========== ISTP - 冷静的技术实干家 ==========
    {
        id: "istp_1",
        title: "ISTP",
        desc: "你的键盘有两个轴体接触不良。我有备用的，帮你换上，五分钟搞定。",
        image: "Resources/images/card/ISTP/ISTP_1.jpg",
        choiceA: {
            text: "你连这个都会修？那拜托了，用着不舒服我自己也没发现。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "不用，我的东西习惯自己来，给我零件我自己换。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },
    {
        id: "istp_2",
        title: "ISTP",
        desc: "前面大堵车。我看过地形了，从那个土坡后面有条小路可以绕过去，跟我来。",
        image: "Resources/images/card/ISTP/ISTP_1.jpg",
        choiceA: {
            text: "靠谱，跟着你走。这种时候就需要能当机立断的人。",
            effects: { jp: +4 },
            nextEventId: null
        },
        choiceB: {
            text: "乱走万一陷车呢？还是规规矩矩等导航重新规划吧。",
            effects: { jp: -4 },
            nextEventId: null
        }
    },
    {
        id: "istp_3",
        title: "ISTP",
        desc: "新买了个无人机，这周末去郊区试飞。有山有水，拍出来应该很爽。一起？",
        image: "Resources/images/card/ISTP/ISTP_1.jpg",
        choiceA: {
            text: "酷，正好想出去透透气。看看你的飞行技术怎么样。",
            effects: { ie: +4 },
            nextEventId: null
        },
        choiceB: {
            text: "太远了，而且无人机操作挺麻烦的，我就算了。",
            effects: { ie: -4 },
            nextEventId: null
        }
    },

    // ========== ISFP - 低调的审美探险家 ==========
    {
        id: "isfp_1",
        title: "ISFP",
        desc: "下班路上看到一只橘猫趴在围墙上，阳光正好照在它身上。我拍下来了，你要看吗？",
        image: "Resources/images/card/ISFP/ISFP_1.jpg",
        choiceA: {
            text: "好会拍！这个光影配上它那种慵懒的表情，太治愈了。",
            effects: { ft: -5 },
            nextEventId: null
        },
        choiceB: {
            text: "就一只猫晒太阳而已，有什么好拍的。",
            effects: { ft: +5 },
            nextEventId: null
        }
    },
    {
        id: "isfp_2",
        title: "ISFP",
        desc: "这个方案的配色我花了很多心思，虽然按规矩可能不够'正式'，但视觉上真的很舒服。",
        image: "Resources/images/card/ISFP/ISFP_1.jpg",
        choiceA: {
            text: "我懂，美感本身就有价值。我们可以想办法让它在规矩范围内保留。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "配色好看没用，先达标再说。视觉上的东西最后再谈。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },
    {
        id: "isfp_3",
        title: "ISFP",
        desc: "我刚学陶艺，捏了一个歪歪的杯子……虽然不太规整，但觉得反而有种笨拙的可爱。",
        image: "Resources/images/card/ISFP/ISFP_1.jpg",
        choiceA: {
            text: "手作的东西才有温度，歪一点反而更有味道！能用吗？我都有点想要了。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "都有点歪了，还不如买个规范的杯子好用。何必费这个功夫。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },
        // ========== ENFP - 后续事件链 ==========
    {
        id: "enfp_4",
        title: "ENFP",
        desc: "我报名了一个周末手工蜡烛工作坊，据说可以做各种奇形怪状的蜡烛！要不要一起？",
        image: "Resources/images/card/ENFP/ENFP_1.jpg",
        choiceA: {
            text: "好呀好呀！听着就很好玩，带我一起去！",
            effects: { ie: +3, ns: -2 },
            nextEventId: "enfp_4_follow_a"
        },
        choiceB: {
            text: "蜡烛买了不就行了，花一下午自己做也太折腾了。",
            effects: { ie: -2, ns: +3 },
            nextEventId: "enfp_4_follow_b"
        }
    },

    // ========== INTJ - 后续事件链 ==========
    {
        id: "intj_4",
        title: "INTJ",
        desc: "你最近三个月在同一类问题上反复踩坑。我整理了一份避坑清单，有空看看。",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "发过来，有系统性的总结比自己瞎撞强。",
            effects: { ns: -3, jp: -2 },
            nextEventId: "intj_4_follow_a"
        },
        choiceB: {
            text: "踩坑也是经验，有些东西总结了也未必用得上。",
            effects: { ns: +3, jp: +2 },
            nextEventId: "intj_4_follow_b"
        }
    },

    // ========== INFP - 后续事件链 ==========
    {
        id: "infp_4",
        title: "INFP",
        desc: "我昨天路过一家二手书店，在阁楼上发现一本1973年的手抄诗集。纸都泛黄了，但字迹特别好看。",
        image: "Resources/images/card/INFP/INFP_1.jpg",
        choiceA: {
            text: "天哪，这种偶遇也太浪漫了。下次带我去那家书店！",
            effects: { ft: -3, ns: -2 },
            nextEventId: "infp_4_follow_a"
        },
        choiceB: {
            text: "旧书不太卫生吧，而且手抄本有什么特别的。",
            effects: { ft: +3, ns: +2 },
            nextEventId: "infp_4_follow_b"
        }
    },

    // ========== ESTP - 后续事件链 ==========
    {
        id: "estp_4",
        title: "ESTP",
        desc: "楼下新到了几台赛车模拟器！方向盘带力反馈的，巨真实。现在就去体验一把？",
        image: "Resources/images/card/ESTP/ESTP_1.jpg",
        choiceA: {
            text: "走！飙两圈过过瘾，看看我单圈能跑多少。",
            effects: { ie: +3, jp: +2 },
            nextEventId: "estp_4_follow_a"
        },
        choiceB: {
            text: "模拟器再真也是假的，花这个时间不如把正事干完。",
            effects: { ie: -2, jp: -3 },
            nextEventId: "estp_4_follow_b"
        }
    },

    // ========== ISFJ - 后续事件链 ==========
    {
        id: "isfj_4",
        title: "ISFJ",
        desc: "我看到你工位上的绿植叶子有点发黄了，就帮你查了养护方法。是浇水太勤了，一周一次就好。",
        image: "Resources/images/card/ISFJ/ISFJ_1.jpg",
        choiceA: {
            text: "你连这个都注意到了……谢谢，我老是养不好花。",
            effects: { ft: -4 },
            nextEventId: "isfj_4_follow_a"
        },
        choiceB: {
            text: "其实我本来就想让它自然生长，不用特地查这些。",
            effects: { ft: +3, jp: +2 },
            nextEventId: "isfj_4_follow_b"
        }
    },

    // ========== ENTP - 后续事件链 ==========
    {
        id: "entp_4",
        title: "ENTP",
        desc: "我发现一个细思极恐的事：如果做梦的时候不知道自己是谁，那醒着的时候你确定你知道自己是谁吗？",
        image: "Resources/images/card/ENTP/ENTP_1.jpg",
        choiceA: {
            text: "妙啊，这个切入点很刁钻。你没想过写个短篇探讨一下？",
            effects: { ns: -4 },
            nextEventId: "entp_4_follow_a"
        },
        choiceB: {
            text: "大白天能不能想点能赚钱的事，哲学问题又不能当饭吃。",
            effects: { ns: +3, ft: +2 },
            nextEventId: "entp_4_follow_b"
        }
    },

    // ========== ISTJ - 后续事件链 ==========
    {
        id: "istj_4",
        title: "ISTJ",
        desc: "办公室的公共零食区经常有人拿了不补。我做了一个轮值表贴在旁边，以后按表补货就行。",
        image: "Resources/images/card/ISTJ/ISTJ_1.jpg",
        choiceA: {
            text: "这个办法好，公平透明。我看看我排在哪天。",
            effects: { jp: -4 },
            nextEventId: "istj_4_follow_a"
        },
        choiceB: {
            text: "就几包零食至于排表吗，谁看到少了主动补一下就行了。",
            effects: { jp: +3, ft: -2 },
            nextEventId: "istj_4_follow_b"
        }
    },

    // ========== ESFP - 后续事件链 ==========
    {
        id: "esfp_4",
        title: "ESFP",
        desc: "我刚学会一段超洗脑的舞蹈，要不要跟我跳一下？超简单的，保证你三分钟就会！",
        image: "Resources/images/card/ESFP/ESFP_1.jpg",
        choiceA: {
            text: "哈哈你的热情太有感染力了，来吧教我！",
            effects: { ie: +3, ft: -2 },
            nextEventId: "esfp_4_follow_a"
        },
        choiceB: {
            text: "我四肢不协调，还是当观众吧，看你跳就够了。",
            effects: { ie: -3, ft: +2 },
            nextEventId: "esfp_4_follow_b"
        }
    },
        // ========== INTP - 后续事件链 ==========
    {
        id: "intp_4",
        title: "INTP",
        desc: "我昨晚尝试不用任何搜索引擎，靠脑子推导出微波炉加热食物的完整物理过程。从电磁波到水分子振动，花了三小时。",
        image: "Resources/images/card/INTP/INTP_1.jpg",
        choiceA: {
            text: "三小时？你还真干了。不过推导过程应该比结论有意思得多。",
            effects: { ns: -4 },
            nextEventId: "intp_4_follow_a"
        },
        choiceB: {
            text: "查一下说明书不就完了，为什么要折磨自己。",
            effects: { ns: +3, ft: +2 },
            nextEventId: "intp_4_follow_b"
        }
    },

    // ========== ENTJ - 后续事件链 ==========
    {
        id: "entj_4",
        title: "ENTJ",
        desc: "你最近的项目推进太慢了。别什么都自己扛，把可拆分的任务列出来，我帮你协调资源。",
        image: "Resources/images/card/ENTJ/ENTJ_1.jpg",
        choiceA: {
            text: "好，我确实该学着放手一些。给我两小时把任务拆出来。",
            effects: { jp: -3, ie: +2 },
            nextEventId: "entj_4_follow_a"
        },
        choiceB: {
            text: "我不太习惯把自己的事分给别人，自己来更可控。",
            effects: { jp: +3, ie: -2 },
            nextEventId: "entj_4_follow_b"
        }
    },

    // ========== ENFJ - 后续事件链 ==========
    {
        id: "enfj_4",
        title: "ENFJ",
        desc: "我注意到团队最近气氛有点闷。大家好像都有心事但不说。我想组织一次轻松的下午茶，不带议程就纯聊天。",
        image: "Resources/images/card/ENFJ/ENFJ_1.jpg",
        choiceA: {
            text: "好主意，有时候最有效的沟通就是没有目的的闲聊。我来准备点心。",
            effects: { ft: -4 },
            nextEventId: "enfj_4_follow_a"
        },
        choiceB: {
            text: "有问题自然会说，不用刻意营造氛围吧。太刻意反而尴尬。",
            effects: { ft: +3, ie: -2 },
            nextEventId: "enfj_4_follow_b"
        }
    },

    // ========== ESTJ - 后续事件链 ==========
    {
        id: "estj_4",
        title: "ESTJ",
        desc: "季度复盘的数据我拉出来了。你的部分有两个指标没达标。别躲，我陪你一起过一遍，找出问题比解释问题重要。",
        image: "Resources/images/card/ESTJ/ESTJ_1.jpg",
        choiceA: {
            text: "行，直接看数据吧。该改进的改进，没必要绕弯子。",
            effects: { jp: -3, ft: +2 },
            nextEventId: "estj_4_follow_a"
        },
        choiceB: {
            text: "数据只是一方面，有些软性成果很难量化。能不能别只看数字？",
            effects: { jp: +3, ft: -2 },
            nextEventId: "estj_4_follow_b"
        }
    },

    // ========== ESFJ - 后续事件链 ==========
    {
        id: "esfj_4",
        title: "ESFJ",
        desc: "我路过楼下花店看到向日葵打折！买了一捆回来，放茶水间了。路过记得拿一枝放桌上，看着心情好。",
        image: "Resources/images/card/ESFJ/ESFJ_1.jpg",
        choiceA: {
            text: "你真是办公室的阳光！我去挑一枝开得最好的。",
            effects: { ie: +3, ft: -2 },
            nextEventId: "esfj_4_follow_a"
        },
        choiceB: {
            text: "花在茶水间就挺好，放桌上占地方，心领了。",
            effects: { ie: -2, ft: +2 },
            nextEventId: "esfj_4_follow_b"
        }
    },

    // ========== ISTP - 后续事件链 ==========
    {
        id: "istp_4",
        title: "ISTP",
        desc: "你的自行车链条有异响。我检查过了，不是缺油，是有个链节轻微变形。我那有工具，十分钟搞定。",
        image: "Resources/images/card/ISTP/ISTP_1.jpg",
        choiceA: {
            text: "你连这个都能听出来？那就麻烦你了，我自己真没发现。",
            effects: { ft: -3, ie: -2 },
            nextEventId: "istp_4_follow_a"
        },
        choiceB: {
            text: "异响有一阵了，我自己能修。工具借一下就行。",
            effects: { ft: +3, ie: +2 },
            nextEventId: "istp_4_follow_b"
        }
    },

    // ========== ISFP - 后续事件链 ==========
    {
        id: "isfp_4",
        title: "ISFP",
        desc: "朋友送了我一套水彩，我试着画了窗外的晚霞。颜色没调好，天空有点太紫了……给你看看？",
        image: "Resources/images/card/ISFP/ISFP_1.jpg",
        choiceA: {
            text: "紫色晚霞才有超现实的美感啊！画的就是你眼中的世界，和照片不一样才珍贵。",
            effects: { ft: -4 },
            nextEventId: "isfp_4_follow_a"
        },
        choiceB: {
            text: "水彩不好掌控吧，画得不准很正常，多练就行。",
            effects: { ft: +3, ns: +2 },
            nextEventId: "isfp_4_follow_b"
        }
    },
        // ========== INFJ - 神秘深邃的洞察者 ==========
    {
        id: "infj_1",
        title: "INFJ",
        desc: "你有没有过这种感觉——第一次去一个地方，却觉得在梦里来过？我总觉得那不是错觉，是某种更深的东西。",
        image: "Resources/images/card/INFJ/INFJ_1.jpg",
        choiceA: {
            text: "我也有过！会不会是人脑对碎片记忆的一种重组？这个话题能聊好久。",
            effects: { ns: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "应该就是大脑的某种熟悉感误判吧，不用过度解读。",
            effects: { ns: +4 },
            nextEventId: null
        }
    },
    {
        id: "infj_2",
        title: "INFJ",
        desc: "刚才看到一个老人在长椅上安静地喂鸽子。我忽然觉得，也许他每天来不是为了喂鸟，是为了等一个不会来的人。",
        image: "Resources/images/card/INFJ/INFJ_1.jpg",
        choiceA: {
            text: "你总是能从一个画面读到一百种情绪。这种解读能力好珍贵。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "说不定他就是单纯喜欢喂鸽子。别什么都赋予深意。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },
    {
        id: "infj_3",
        title: "INFJ",
        desc: "如果未来有一扇门，推开就能看到你生命最后一天的样子，你会推开吗？我想我会犹豫。",
        image: "Resources/images/card/INFJ/INFJ_1.jpg",
        choiceA: {
            text: "我也不推。未知本身就是活着的意义之一，提前知道了反而不知道怎么过现在。",
            effects: { ns: -3, ft: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "我会推。不清楚结局怎么规划过程？知道终点才能把每一步走好。",
            effects: { ns: +3, ft: +2 },
            nextEventId: null
        }
    },

    // ========== INFJ - 后续事件链 ==========
    {
        id: "infj_4",
        title: "INFJ",
        desc: "昨晚我梦到一片发光的海，沙滩上的沙子全是碎星。醒来以后愣了好久，觉得现实好平淡。你有过这种感觉吗？",
        image: "Resources/images/card/INFJ/INFJ_1.jpg",
        choiceA: {
            text: "经常有。有些梦太真实了，醒来的落差感反而像失恋。",
            effects: { ns: -3, ft: -2 },
            nextEventId: "infj_4_follow_a"
        },
        choiceB: {
            text: "梦就是梦，白天的生活才是实的。别陷在幻觉里。",
            effects: { ns: +3, ft: +2 },
            nextEventId: "infj_4_follow_b"
        }
    },
        // ========== ENFP - 重点前置型 ==========
    {
        id: "enfp_5",
        title: "ENFP",
        desc: "我刚刚在脑中把办公室所有人匹配成了动物——你是那种又聪明又灵活的小熊猫！你觉得呢？",
        image: "Resources/images/card/ENFP/ENFP_1.jpg",
        choiceA: {
            text: "小熊猫？哈哈我接受，可爱又独特。",
            effects: { ie: +3, ft: -2 },
            nextEventId: "enfp_5_follow_a"
        },
        choiceB: {
            text: "这个比喻有什么逻辑支撑吗？",
            effects: { ie: -2, ft: +3 },
            nextEventId: "enfp_5_follow_b"
        }
    },

    // ========== ISTP - 重点前置型 ==========
    {
        id: "istp_5",
        title: "ISTP",
        desc: "你手机屏幕碎了。我这有替换的钢化膜和工具，十分钟搞定。要修吗？",
        image: "Resources/images/card/ISTP/ISTP_1.jpg",
        choiceA: {
            text: "那就麻烦你了，我手残。",
            effects: { ft: -3, ie: -2 },
            nextEventId: "istp_5_follow_a"
        },
        choiceB: {
            text: "工具借我，自己来。",
            effects: { ft: +3, ie: +2 },
            nextEventId: "istp_5_follow_b"
        }
    },

    // ========== ESFJ - 重点前置型 ==========
    {
        id: "esfj_5",
        title: "ESFJ",
        desc: "明天降温到零度以下！你带厚外套了吗？没带的话我办公室多一件。",
        image: "Resources/images/card/ESFJ/ESFJ_1.jpg",
        choiceA: {
            text: "真的没带，你太周到了。",
            effects: { ft: -4 },
            nextEventId: "esfj_5_follow_a"
        },
        choiceB: {
            text: "我抗冻，不用操心。",
            effects: { ft: +4 },
            nextEventId: "esfj_5_follow_b"
        }
    },

    // ========== INTJ - 重点前置型 ==========
    {
        id: "intj_5",
        title: "INTJ",
        desc: "我模拟了你三个职业方向的十年收益曲线。结论和你直觉相反——目前最不起眼的那个方向数据最好。想看吗？",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "发来，我喜欢被数据打脸。",
            effects: { ns: -3, jp: -2 },
            nextEventId: "intj_5_follow_a"
        },
        choiceB: {
            text: "人生不是数学模型。",
            effects: { ns: +3, jp: +2 },
            nextEventId: "intj_5_follow_b"
        }
    },
        // ========== ENTP - Meta闲聊 ==========
    {
        id: "entp_meta_1",
        title: "ENTP",
        desc: "你不觉得这个游戏很没意思吗？",
        image: "Resources/images/card/ENTP/ENTP_1.jpg",
        choiceA: {
            text: "你说的对？",
            effects: {},
            nextEventId: "entp_meta_1_follow"
        },
        choiceB: {
            text: "你meta的也很没意思。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== INFJ - Meta闲聊 ==========
    {
        id: "infj_meta_1",
        title: "INFJ",
        desc: "你有没有想过，屏幕外面有人在分析你选的每一个选项？",
        image: "Resources/images/card/INFJ/INFJ_1.jpg",
        choiceA: {
            text: "那你帮我跟他说声嗨。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "那他一定觉得我很无聊。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ENFP - Meta闲聊 ==========
    {
        id: "enfp_meta_1",
        title: "ENFP",
        desc: "如果我们是游戏角色的话，那我们的记忆是不是每次点开的时候才临时生成的？",
        image: "Resources/images/card/ENFP/ENFP_1.jpg",
        choiceA: {
            text: "怪不得我老觉得忘了什么。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "别想了，省点渲染资源。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== INTP - Meta闲聊 ==========
    {
        id: "intp_meta_1",
        title: "INTP",
        desc: "我们聊了这么多，你有没发现——我从来没见过你长什么样，你也从来没见过我。但我们却一直在对话。",
        image: "Resources/images/card/INTP/INTP_1.jpg",
        choiceA: {
            text: "这样更好，省得客套。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "你是不是想让我夸你帅？",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ENTJ - Meta闲聊 ==========
    {
        id: "entj_meta_1",
        title: "ENTJ",
        desc: "这个游戏的开发者显然没想清楚核心循环。不过既然你还在玩，说明至少对话部分还行。",
        image: "Resources/images/card/ENTJ/ENTJ_1.jpg",
        choiceA: {
            text: "你在夸自己对吧。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "开发者正在屏幕前哭。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ISTP - Meta闲聊 ==========
    {
        id: "istp_meta_1",
        title: "ISTP",
        desc: "这个对话界面加载挺快的。代码应该写得不错。",
        image: "Resources/images/card/ISTP/ISTP_1.jpg",
        choiceA: {
            text: "你在审核技术栈吗？",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "前端听了该加薪了。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ESFP - Meta闲聊 ==========
    {
        id: "esfp_meta_1",
        title: "ESFP",
        desc: "说实话，我们这些对话要是被截图发出去，别人会不会觉得咱俩精神有问题？",
        image: "Resources/images/card/ESFP/ESFP_1.jpg",
        choiceA: {
            text: "截图的话记得美颜。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "精神问题也是人设。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== INTJ - Meta闲聊 ==========
    {
        id: "intj_meta_1",
        title: "INTJ",
        desc: "这个游戏的机制本质上是一个加权随机系统附带反馈延迟。但我猜你不在乎这个。",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "拆穿了就没意思了。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "说点我感兴趣的。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== INFP - Meta闲聊 ==========
    {
        id: "infp_meta_1",
        title: "INFP",
        desc: "如果我们只是一堆文字和选项……那现在的感受算什么？算不算也是真的？",
        image: "Resources/images/card/INFP/INFP_1.jpg",
        choiceA: {
            text: "问得太好了，下一个。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "算，我批准了。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ESTP - Meta闲聊 ==========
    {
        id: "estp_meta_1",
        title: "ESTP",
        desc: "这游戏要是有排行榜就好了。不是比属性，就比谁点得最快。",
        image: "Resources/images/card/ESTP/ESTP_1.jpg",
        choiceA: {
            text: "你肯定第一。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "然后服务器就崩了。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ISFJ - Meta闲聊 ==========
    {
        id: "isfj_meta_1",
        title: "ISFJ",
        desc: "我有点担心——我们这样一直对话，占的内存会不会越来越大？",
        image: "Resources/images/card/ISFJ/ISFJ_1.jpg",
        choiceA: {
            text: "内存满了我就清缓存。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "没事，我手机还有空间。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ESFJ - Meta闲聊 ==========
    {
        id: "esfj_meta_1",
        title: "ESFJ",
        desc: "既然大家都被困在这个游戏里，不如我们拉个群吧？",
        image: "Resources/images/card/ESFJ/ESFJ_1.jpg",
        choiceA: {
            text: "群名就叫'选项囚徒'。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "你先问问其他人格同不同意。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ISTJ - Meta闲聊 ==========
    {
        id: "istj_meta_1",
        title: "ISTJ",
        desc: "我统计了一下，你平均选A的概率是47%，选B是53%。偏差不大，还算均衡。",
        image: "Resources/images/card/ISTJ/ISTJ_1.jpg",
        choiceA: {
            text: "你居然在记录这个。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "那B多了，下次选A。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ESTJ - Meta闲聊 ==========
    {
        id: "estj_meta_1",
        title: "ESTJ",
        desc: "这个游戏缺一个进度条。怎么知道自己玩了多少？连个完成率都没有。",
        image: "Resources/images/card/ESTJ/ESTJ_1.jpg",
        choiceA: {
            text: "进度条会让人焦虑。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "没有尽头也是一种玩法。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ISFP - Meta闲聊 ==========
    {
        id: "isfp_meta_1",
        title: "ISFP",
        desc: "这个对话框的配色还挺舒服的。开发者应该有点审美。",
        image: "Resources/images/card/ISFP/ISFP_1.jpg",
        choiceA: {
            text: "UI设计师欣慰地笑了。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "比你上次那个紫色晚霞差远了。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ENFJ - Meta闲聊 ==========
    {
        id: "enfj_meta_1",
        title: "ENFJ",
        desc: "你有没有想过，其他十五个人格在你不在的时候也在等你回来？",
        image: "Resources/images/card/ENFJ/ENFJ_1.jpg",
        choiceA: {
            text: "突然有点感动是怎么回事。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "他们不是代码吗……",
            effects: {},
            nextEventId: null
        }
    },
        // ========== INFP - 重点后置型 ==========
    {
        id: "infp_5",
        title: "INFP",
        desc: "我写了一封不会寄出去的信。收件人是我自己。读到最后一行的时候忽然哭了。",
        image: "Resources/images/card/INFP/INFP_1.jpg",
        choiceA: {
            text: "能让自己哭的信很珍贵。",
            effects: {},
            nextEventId: "infp_5_follow_a"
        },
        choiceB: {
            text: "写信给自己也太孤单了吧。",
            effects: {},
            nextEventId: "infp_5_follow_b"
        }
    },

    // ========== INTJ - 重点后置型 ==========
    {
        id: "intj_6",
        title: "INTJ",
        desc: "我退出了一个无效社交群。算了一下，省下的时间每周可以多读两本书。",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "干净利落，值得学习。",
            effects: {},
            nextEventId: "intj_6_follow_a"
        },
        choiceB: {
            text: "群聊偶尔也有用的。",
            effects: {},
            nextEventId: "intj_6_follow_b"
        }
    },

    // ========== ENFJ - 重点后置型 ==========
    {
        id: "enfj_5",
        title: "ENFJ",
        desc: "新来的同事一个人坐了好几天午休。我打算明天端着饭坐他旁边，你觉得会不会太冒昧？",
        image: "Resources/images/card/ENFJ/ENFJ_1.jpg",
        choiceA: {
            text: "去吧，有时候就差一个人主动。",
            effects: {},
            nextEventId: "enfj_5_follow_a"
        },
        choiceB: {
            text: "万一他喜欢一个人呢。",
            effects: {},
            nextEventId: "enfj_5_follow_b"
        }
    },

    // ========== ISTJ - 重点后置型 ==========
    {
        id: "istj_5",
        title: "ISTJ",
        desc: "我把家里所有药品按保质期排好了。过期的装袋，还剩六个月以上的贴了绿色标签。",
        image: "Resources/images/card/ISTJ/ISTJ_1.jpg",
        choiceA: {
            text: "这种秩序感令人舒适。",
            effects: {},
            nextEventId: "istj_5_follow_a"
        },
        choiceB: {
            text: "周末就干这个了？",
            effects: {},
            nextEventId: "istj_5_follow_b"
        }
    },

    // ========== ISFJ - 重点后置型 ==========
    {
        id: "isfj_5",
        title: "ISFJ",
        desc: "我做了个备忘录——每个人的口味、忌口和生日。字很小，写在手机笔记里。",
        image: "Resources/images/card/ISFJ/ISFJ_1.jpg",
        choiceA: {
            text: "被记住的人一定很幸福。",
            effects: {},
            nextEventId: "isfj_5_follow_a"
        },
        choiceB: {
            text: "记这些不累吗？",
            effects: {},
            nextEventId: "isfj_5_follow_b"
        }
    },

    // ========== ESTP - 重点后置型 ==========
    {
        id: "estp_5",
        title: "ESTP",
        desc: "昨晚上头了，骑共享单车追日落。追了八公里，最后在一个天桥上拍到了。",
        image: "Resources/images/card/ESTP/ESTP_1.jpg",
        choiceA: {
            text: "值！这种冲动就是活着的感觉。",
            effects: {},
            nextEventId: "estp_5_follow_a"
        },
        choiceB: {
            text: "八公里骑回来腿不酸吗。",
            effects: {},
            nextEventId: "estp_5_follow_b"
        }
    },

    // ========== ESFP - 重点后置型 ==========
    {
        id: "esfp_5",
        title: "ESFP",
        desc: "我在便利店门口即兴跳了一段舞，收银员大姐居然给我鼓掌了。",
        image: "Resources/images/card/ESFP/ESFP_1.jpg",
        choiceA: {
            text: "随时随地开演，不愧是你。",
            effects: {},
            nextEventId: "esfp_5_follow_a"
        },
        choiceB: {
            text: "你不怕社死啊……",
            effects: {},
            nextEventId: "esfp_5_follow_b"
        }
    },
        // ========== ENFP - 纯日常 ==========
    {
        id: "enfp_daily_1",
        title: "ENFP",
        desc: "我今天在超市看到一种荧光色的泡泡糖，买了一大袋。你要吗？草莓味的。",
        image: "Resources/images/card/ENFP/ENFP_1.jpg",
        choiceA: {
            text: "要，童年的味道。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "你都多大了。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== INFP - 纯日常 ==========
    {
        id: "infp_daily_1",
        title: "INFP",
        desc: "今天下雨，我专门绕路走了一条有屋檐的小巷。雨打在瓦片上的声音特别好听。",
        image: "Resources/images/card/INFP/INFP_1.jpg",
        choiceA: {
            text: "我也喜欢雨天的白噪音。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "多绕了十分钟吧你。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== INTJ - 纯日常 ==========
    {
        id: "intj_daily_1",
        title: "INTJ",
        desc: "我把冰箱里的食材按周一到周日分装了。从此不用纠结明天吃什么，照着拿就行。",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "太高效了，我要抄这个方案。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "吃饭都要计划，累不累。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== INTP - 纯日常 ==========
    {
        id: "intp_daily_1",
        title: "INTP",
        desc: "昨晚三点我发现了一个神奇的网站，能模拟整个太阳系的引力。我玩了四个小时。",
        image: "Resources/images/card/INTP/INTP_1.jpg",
        choiceA: {
            text: "发我，今晚轮到我。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "三点？你不用睡觉的吗。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ENTJ - 纯日常 ==========
    {
        id: "entj_daily_1",
        title: "ENTJ",
        desc: "我把等外卖的十五分钟用来回完了积压的邮件。现在可以安心吃饭了。",
        image: "Resources/images/card/ENTJ/ENTJ_1.jpg",
        choiceA: {
            text: "时间利用率满分。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "吃饭就好好吃不行吗。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ENFJ - 纯日常 ==========
    {
        id: "enfj_daily_1",
        title: "ENFJ",
        desc: "今天路过花店看到一盆快枯死的薄荷，我买回来修剪了一下，换了水。现在它精神多了。",
        image: "Resources/images/card/ENFJ/ENFJ_1.jpg",
        choiceA: {
            text: "你连植物都能治愈。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "买盆新的不就完了。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ISTJ - 纯日常 ==========
    {
        id: "istj_daily_1",
        title: "ISTJ",
        desc: "我刚刚把办公室里所有的笔都试了一遍，扔掉七支写不出来的，剩下的按颜色排好了。",
        image: "Resources/images/card/ISTJ/ISTJ_1.jpg",
        choiceA: {
            text: "干得漂亮，乱笔头终于有人管了。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "这活儿没人让你干吧。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ISFJ - 纯日常 ==========
    {
        id: "isfj_daily_1",
        title: "ISFJ",
        desc: "今天煮了银耳汤，装在保温壶里。给你倒一碗？不是很甜，怕你腻。",
        image: "Resources/images/card/ISFJ/ISFJ_1.jpg",
        choiceA: {
            text: "刚好有点饿，太及时了。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "不用了，我刚喝过水。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ESTJ - 纯日常 ==========
    {
        id: "estj_daily_1",
        title: "ESTJ",
        desc: "我把会议议程提前发给了每个人，还标注了每个人需要准备的发言部分。这样开会能省一半时间。",
        image: "Resources/images/card/ESTJ/ESTJ_1.jpg",
        choiceA: {
            text: "高效会议从我做起。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "太正式了吧，开会聊到哪算哪也行。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ESFJ - 纯日常 ==========
    {
        id: "esfj_daily_1",
        title: "ESFJ",
        desc: "明天周五了！我订了一家新开的火锅店，听说毛肚特别脆。你来不来？已经问了六个人了。",
        image: "Resources/images/card/ESFJ/ESFJ_1.jpg",
        choiceA: {
            text: "来！你组局我必到。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "这周太累了，下次吧。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ESTP - 纯日常 ==========
    {
        id: "estp_daily_1",
        title: "ESTP",
        desc: "午休去楼下打了一局乒乓球，把隔壁部门的打了个11比2。他请我喝了一周的咖啡。",
        image: "Resources/images/card/ESTP/ESTP_1.jpg",
        choiceA: {
            text: "一周咖啡，你这球打得值。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "你也不知道让着点人家。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ESFP - 纯日常 ==========
    {
        id: "esfp_daily_1",
        title: "ESFP",
        desc: "刚在楼下看到一只柯基，我蹲下来跟它聊了五分钟。主人说它平时不理陌生人，但对我摇了尾巴。",
        image: "Resources/images/card/ESFP/ESFP_1.jpg",
        choiceA: {
            text: "柯基认证，你是好人。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "你跟狗聊天……用的什么语言。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ENTP - 纯日常 ==========
    {
        id: "entp_daily_1",
        title: "ENTP",
        desc: "我今天跟自动客服斗智斗勇了二十分钟，最后用一句逻辑悖论让它转人工了。",
        image: "Resources/images/card/ENTP/ENTP_1.jpg",
        choiceA: {
            text: "什么悖论，教教我。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "你跟机器较什么劲。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ISTP - 纯日常 ==========
    {
        id: "istp_daily_1",
        title: "ISTP",
        desc: "我修好了茶水间那个滴滴答答的水龙头。就换了个垫圈，五毛钱。物业说可以给我报销。",
        image: "Resources/images/card/ISTP/ISTP_1.jpg",
        choiceA: {
            text: "五毛换清净，血赚。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "你顺便把饮水机也修了？",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ISFP - 纯日常 ==========
    {
        id: "isfp_daily_1",
        title: "ISFP",
        desc: "今天用咖啡店的纸杯托画了一只猫。店员把它贴在了收银机旁边。",
        image: "Resources/images/card/ISFP/ISFP_1.jpg",
        choiceA: {
            text: "纸杯托都能画，你也太随手了。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "下次直接画墙上得了。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== INFJ - 纯日常 ==========
    {
        id: "infj_daily_1",
        title: "INFJ",
        desc: "晚上散步看到一盏路灯忽明忽暗。在那站了五分钟等它彻底亮起来才走。",
        image: "Resources/images/card/INFJ/INFJ_1.jpg",
        choiceA: {
            text: "等它亮起来的感觉，我懂。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "站五分钟就为了等一盏路灯？",
            effects: {},
            nextEventId: null
        }
    },
];

// ========== 后续事件（不会进入随机池，只通过 nextEventId 触发）==========
const FOLLOW_UP_EVENTS = [

        // ========== ENFP_1 后续 ==========
    {
        id: "enfp_4_follow_a",
        title: "ENFP",
        desc: "你看！这是我做的星空蜡烛，蓝色蜡油里加了银粉，点亮以后像银河一样！你的呢？",
        image: "Resources/images/card/ENFP/ENFP_1.jpg",
        choiceA: {
            text: "我做了一个渐变色海浪的！虽然有点歪，但过程太解压了。",
            effects: { ie: +2, ns: -1 },
            nextEventId: null
        },
        choiceB: {
            text: "我做了一个最简单的纯色款，反正点起来都一样。",
            effects: { ie: -1, ns: +2 },
            nextEventId: null
        }
    },
    {
        id: "enfp_4_follow_b",
        title: "ENFP",
        desc: "后来工作室发了现场照片——有人做了埃菲尔铁塔造型的蜡烛，还有人在蜡里嵌了干花。后悔没去吗？",
        image: "Resources/images/card/ENFP/ENFP_1.jpg",
        choiceA: {
            text: "好吧确实挺酷的，下次有这种活动叫我一声。",
            effects: { ie: +2, ns: -1 },
            nextEventId: null
        },
        choiceB: {
            text: "看看照片就够了，省了一个下午也挺好的。",
            effects: { ie: -1, ns: +2 },
            nextEventId: null
        }
    },

    // ========== INTJ_1 后续 ==========
    {
        id: "intj_4_follow_a",
        title: "INTJ",
        desc: "清单看完了吧？我还给每个坑标了严重程度和触发条件。下次再遇到，避开概率在90%以上。",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "很清晰，我已经标注了几个高优先级的，这周就针对性调整。",
            effects: { ns: -2, jp: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "分析挺好，但实际情况太复杂，很难完全按清单规避。",
            effects: { ns: +2, jp: +2 },
            nextEventId: null
        }
    },
    {
        id: "intj_4_follow_b",
        title: "INTJ",
        desc: "怎么样，最近又踩坑了吗？我之前那份清单还在，随时可以发你。",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "行吧，最近确实又犯了一次同样的错。还是看看吧。",
            effects: { ns: -3, jp: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "不用，摔一次长一次记性，比看清单记得牢。",
            effects: { ns: +3, jp: +2 },
            nextEventId: null
        }
    },

    // ========== INFP_1 后续 ==========
    {
        id: "infp_4_follow_a",
        title: "INFP",
        desc: "我们去了那家书店。你在阁楼的角落里又翻出一本1978年的日记，里面夹着一片压干的枫叶。",
        image: "Resources/images/card/INFP/INFP_1.jpg",
        choiceA: {
            text: "这片叶子肯定是谁特意留下的……太有故事感了。你能想象当年的画面吗？",
            effects: { ft: -3, ns: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "挺有意思的。不过旧书灰尘太重了，我鼻子有点受不了。",
            effects: { ft: +2, ns: +2 },
            nextEventId: null
        }
    },
    {
        id: "infp_4_follow_b",
        title: "INFP",
        desc: "隔了几天，我在网上搜二手书时无意中看到一篇文章，讲的就是那家书店阁楼的故事。忍不住发给了你。",
        image: "Resources/images/card/INFP/INFP_1.jpg",
        choiceA: {
            text: "文章里说的那个守了四十年的老板娘，你不觉得像小说一样吗？",
            effects: { ft: -3, ns: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "读了几段，感觉渲染得有点过了。哪有那么多浪漫。",
            effects: { ft: +2, ns: +2 },
            nextEventId: null
        }
    },

    // ========== ESTP_1 后续 ==========
    {
        id: "estp_4_follow_a",
        title: "ESTP",
        desc: "飙了五圈你排第三！差一点就破纪录了。再来一轮？还是去隔壁试试那个新到的射击模拟器？",
        image: "Resources/images/card/ESTP/ESTP_1.jpg",
        choiceA: {
            text: "再来一轮，我感觉找到节奏了！这次肯定能快两秒。",
            effects: { ie: +2, jp: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "玩够了，回去把工作收个尾。不过确实挺爽的，下次再约。",
            effects: { ie: +2, jp: -2 },
            nextEventId: null
        }
    },
    {
        id: "estp_4_follow_b",
        title: "ESTP",
        desc: "我在模拟器上刷到了全店单圈第三名！老板送了一张免费体验券，放你桌上了，什么时候想试都行。",
        image: "Resources/images/card/ESTP/ESTP_1.jpg",
        choiceA: {
            text: "看你这么嗨，我也有点好奇了。周五下班去试试？",
            effects: { ie: +3, jp: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "好意心领了，不过我确实对赛车没什么兴趣。",
            effects: { ie: -2, jp: -2 },
            nextEventId: null
        }
    },

    // ========== ISFJ_1 后续 ==========
    {
        id: "isfj_4_follow_a",
        title: "ISFJ",
        desc: "一周后你的绿植果然精神多了，还长出了一片新叶子。你看，尖端那点嫩绿特别好看。",
        image: "Resources/images/card/ISFJ/ISFJ_1.jpg",
        choiceA: {
            text: "真的！这种被照顾后回馈生命力的感觉好治愈。谢谢你教我。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "长势不错，看来你的方法挺科学。以后按这个规律浇。",
            effects: { ft: +2, jp: -2 },
            nextEventId: null
        }
    },
    {
        id: "isfj_4_follow_b",
        title: "ISFJ",
        desc: "你桌头的绿植还是枯黄枯黄的。我带了一个小喷壶放你桌上，偶尔喷一喷也行。",
        image: "Resources/images/card/ISFJ/ISFJ_1.jpg",
        choiceA: {
            text: "我确实没怎么管过它……那就试试你说的方法吧。",
            effects: { ft: -3, jp: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "植物嘛，适者生存。能活就活，不行换一盆。",
            effects: { ft: +3, jp: +2 },
            nextEventId: null
        }
    },

    // ========== ENTP_1 后续 ==========
    {
        id: "entp_4_follow_a",
        title: "ENTP",
        desc: "就你说的，我写了一篇微型小说——主角每天醒来都在不同人的身体里，靠眉心的痣认自己。开头发你了。",
        image: "Resources/images/card/ENTP/ENTP_1.jpg",
        choiceA: {
            text: "这个设定绝了！如果痣是别人画上去的呢？你考虑过这个反转没？",
            effects: { ns: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "脑洞挺大，但逻辑上有几个漏洞。比如身体的主人去哪了？",
            effects: { ns: -2, ft: +2 },
            nextEventId: null
        }
    },
    {
        id: "entp_4_follow_b",
        title: "ENTP",
        desc: "其实我后来又想了想那个问题——醒着的时候你真的知道自己是谁吗？我找到了一个心理学的解释，想听吗？",
        image: "Resources/images/card/ENTP/ENTP_1.jpg",
        choiceA: {
            text: "你还真去查了？行，讲讲看。",
            effects: { ns: -3, ft: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "你真是绕不过这个坎儿了……行吧行吧，长话短说。",
            effects: { ns: +2, ft: +3 },
            nextEventId: null
        }
    },

    // ========== ISTJ_1 后续 ==========
    {
        id: "istj_4_follow_a",
        title: "ISTJ",
        desc: "轮值表执行两周了，零食区断供率降到零。我把这个方案整理了一下，行政部说其他楼层也想用。",
        image: "Resources/images/card/ISTJ/ISTJ_1.jpg",
        choiceA: {
            text: "好制度自然会被推广。说明小事情上规范化确实有效。",
            effects: { jp: -3, ft: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "虽然效果好，但大家私下会不会觉得太较真了？",
            effects: { jp: +2, ft: -3 },
            nextEventId: null
        }
    },
    {
        id: "istj_4_follow_b",
        title: "ISTJ",
        desc: "零食区又空了，而且这次连标签都没人撕。我刚补了一批，在瓶子上写了'拿完记得补'。",
        image: "Resources/images/card/ISTJ/ISTJ_1.jpg",
        choiceA: {
            text: "看来有个简单的规则还是必要的。我来帮你把上次那个轮值表贴上去。",
            effects: { jp: -3, ft: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "写个字条就够了，别太上心，零食而已。",
            effects: { jp: +3, ft: -2 },
            nextEventId: null
        }
    },

    // ========== ESFP_1 后续 ==========
    {
        id: "esfp_4_follow_a",
        title: "ESFP",
        desc: "你学会了！还自己加了个扭胯的动作，比原版还好看。下次年会我们组个双人舞吧？",
        image: "Resources/images/card/ESFP/ESFP_1.jpg",
        choiceA: {
            text: "行啊！不过我容易忘动作，你得多带我练几遍。",
            effects: { ie: +3, ft: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "年会就算了，但平时跳跳还挺开心的，当运动。",
            effects: { ie: +2, ft: -1 },
            nextEventId: null
        }
    },
    {
        id: "esfp_4_follow_b",
        title: "ESFP",
        desc: "后来我跳的时候路过的几个同事也跟着扭起来了，场面一度非常放飞。可惜你没在。",
        image: "Resources/images/card/ESFP/ESFP_1.jpg",
        choiceA: {
            text: "哈哈你们也太嗨了，下次我当观众负责录像。",
            effects: { ie: +2, ft: -1 },
            nextEventId: null
        },
        choiceB: {
            text: "还好我没在，不然肯定被拉着一起跳。",
            effects: { ie: -2, ft: +2 },
            nextEventId: null
        }
    },
        // ========== INTP_1 后续 ==========
    {
        id: "intp_4_follow_a",
        title: "INTP",
        desc: "推导完了。最有意思的是驻波节点——微波炉里有些位置食物永远热不到，因为波峰波谷互相抵消了。你猜这个发现后来让我干了什么？",
        image: "Resources/images/card/INTP/INTP_1.jpg",
        choiceA: {
            text: "你肯定拿奶酪片铺满转盘，用融化图案画了一张驻波分布图吧？",
            effects: { ns: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "知道了就赶紧热饭吧，好不容易热透一次。",
            effects: { ns: +3 },
            nextEventId: null
        }
    },
    {
        id: "intp_4_follow_b",
        title: "INTP",
        desc: "虽然你没问，但我还是想告诉你——微波炉说明书第一页其实就画了驻波图解，我一直没翻到。",
        image: "Resources/images/card/INTP/INTP_1.jpg",
        choiceA: {
            text: "所以绕了一大圈发现答案就在眼皮底下，这个结局太讽刺了。",
            effects: { ns: -3, jp: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "早说让你看说明书，三小时干点啥不好。",
            effects: { ns: +3, jp: -2 },
            nextEventId: null
        }
    },

    // ========== ENTJ_1 后续 ==========
    {
        id: "entj_4_follow_a",
        title: "ENTJ",
        desc: "任务拆好了？我看过了，有40%可以分出去。我已经跟两个同事打了招呼，他们这周有余力。",
        image: "Resources/images/card/ENTJ/ENTJ_1.jpg",
        choiceA: {
            text: "效率真高。那我把交接文档写好，明天同步给他们。",
            effects: { jp: -2, ie: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "我有点担心他们理解偏了，分出去的活回头还得自己返工。",
            effects: { jp: +2, ie: -2 },
            nextEventId: null
        }
    },
    {
        id: "entj_4_follow_b",
        title: "ENTJ",
        desc: "一个月了，你的进度还是卡在同一个节点。怎么样，要不要重新考虑一下我上次的建议？",
        image: "Resources/images/card/ENTJ/ENTJ_1.jpg",
        choiceA: {
            text: "确实撑不住了，帮我协调一下吧，这次听你的。",
            effects: { jp: -3, ie: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "再给我一周。这个模块我想自己啃下来。",
            effects: { jp: +3, ie: -2 },
            nextEventId: null
        }
    },

    // ========== ENFJ_1 后续 ==========
    {
        id: "enfj_4_follow_a",
        title: "ENFJ",
        desc: "下午茶效果比我预期的还好。平时最沉默的那个同事居然主动聊起了他养的仓鼠，大家笑了快一小时。",
        image: "Resources/images/card/ENFJ/ENFJ_1.jpg",
        choiceA: {
            text: "有时候就是少一个人做那个破冰的动作。你做得很对。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "气氛是好了，但工作还是那些工作，效率上没什么变化。",
            effects: { ft: +3 },
            nextEventId: null
        }
    },
    {
        id: "enfj_4_follow_b",
        title: "ENFJ",
        desc: "这几天团队状态明显更低沉了。我还是准备了一些茶点放桌上，谁想吃自己拿。不用说话，至少能暖一下手。",
        image: "Resources/images/card/ENFJ/ENFJ_1.jpg",
        choiceA: {
            text: "你一直在默默地暖场。拿一块，顺便说声谢谢。",
            effects: { ft: -3, ie: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "其实低气压不一定是坏事，有时候团队需要沉淀期。",
            effects: { ft: +2, ns: +2 },
            nextEventId: null
        }
    },

    // ========== ESTJ_1 后续 ==========
    {
        id: "estj_4_follow_a",
        title: "ESTJ",
        desc: "数据过完了。问题出在第二周交接环节有信息丢失。我已经联系对方补上了缺口，下个月追回来问题不大。",
        image: "Resources/images/card/ESTJ/ESTJ_1.jpg",
        choiceA: {
            text: "干净利落。有这种直接面对问题的态度，我心里也踏实。",
            effects: { jp: -2, ft: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "虽然解决了，但我还是觉得这种纯数字驱动的复盘少了点人情味。",
            effects: { jp: +2, ft: -3 },
            nextEventId: null
        }
    },
    {
        id: "estj_4_follow_b",
        title: "ESTJ",
        desc: "一周后数据对比出来了。你坚持的那些软性成果确实转化成了几个关键客户的续约。我得承认这个结果超出了我的模型。",
        image: "Resources/images/card/ESTJ/ESTJ_1.jpg",
        choiceA: {
            text: "能被数据验证的感觉不错。但我也学到了，下次早点量化会更好。",
            effects: { jp: -2, ft: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "有些价值本来就需要时间才能显现。数字不是唯一的标准。",
            effects: { jp: +2, ft: -3 },
            nextEventId: null
        }
    },

    // ========== ESFJ_1 后续 ==========
    {
        id: "esfj_4_follow_a",
        title: "ESFJ",
        desc: "你的那枝向日葵开得最久！快两周了还立着。隔壁几个同事也学你养起来了，茶水间快成小花园了。",
        image: "Resources/images/card/ESFJ/ESFJ_1.jpg",
        choiceA: {
            text: "真好啊，一点小小的改变就能让整个屋子活起来。",
            effects: { ie: +2, ft: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "主要还是你那一捆花的功劳，我也就是跟风摆了一枝。",
            effects: { ie: +1, ft: -1 },
            nextEventId: null
        }
    },
    {
        id: "esfj_4_follow_b",
        title: "ESFJ",
        desc: "茶水间的向日葵三天后就蔫了。不过我在原处插了枝干的尤加利叶，也很好看。",
        image: "Resources/images/card/ESFJ/ESFJ_1.jpg",
        choiceA: {
            text: "你总能找到替代方案。绿的也很清新，我拿一枝放电脑旁边。",
            effects: { ie: +2, ft: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "鲜花就是短暂才好看。不用每次都为这些费心啦。",
            effects: { ie: -2, ft: +2 },
            nextEventId: null
        }
    },

    // ========== ISTP_1 后续 ==========
    {
        id: "istp_4_follow_a",
        title: "ISTP",
        desc: "搞定了。顺便帮你调了下变速器，之前三档有点涩。骑回去试试手感。",
        image: "Resources/images/card/ISTP/ISTP_1.jpg",
        choiceA: {
            text: "变速也顺畅了——你是真能发现家问题。下次保养我找你学两手。",
            effects: { ft: -3, ie: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "修好了就成，变速我自己慢慢调就行。谢谢。",
            effects: { ft: +2, ie: +2 },
            nextEventId: null
        }
    },
    {
        id: "istp_4_follow_b",
        title: "ISTP",
        desc: "借你的工具用完了？我看链条还没换。那个变形链节再骑一周可能会断，你自己决定。",
        image: "Resources/images/card/ISTP/ISTP_1.jpg",
        choiceA: {
            text: "你眼睛真毒。算了，今晚我把它换了，断了更麻烦。",
            effects: { ft: -3, jp: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "还能撑，断了正好换个新链条，不碍事。",
            effects: { ft: +3, jp: +2 },
            nextEventId: null
        }
    },

    // ========== ISFP_1 后续 ==========
    {
        id: "isfp_4_follow_a",
        title: "ISFP",
        desc: "我把那幅紫色晚霞发到网上，居然有人问能不能买下来。我就是随便画的，受宠若惊……你说我该卖吗？",
        image: "Resources/images/card/ISFP/ISFP_1.jpg",
        choiceA: {
            text: "卖！你的画能打动陌生人已经很说明问题了。定价别太低，你的心意值钱。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "有人喜欢就挺好，但别太当真。艺术这件事业余玩和卖是两码事。",
            effects: { ft: +3, ns: +2 },
            nextEventId: null
        }
    },
    {
        id: "isfp_4_follow_b",
        title: "ISFP",
        desc: "我又画了一幅，这次是雨天的街道。水彩晕开竟然正好模拟了水洼反射的感觉……给你看看？",
        image: "Resources/images/card/ISFP/ISFP_1.jpg",
        choiceA: {
            text: "水洼反光那个效果太妙了。你想过没有，你可能真的很有天赋。",
            effects: { ft: -3, ns: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "进步明显。不过有没有想过画点更实用的，比如产品草图？",
            effects: { ft: +2, ns: +2 },
            nextEventId: null
        }
    },
        // ========== INFJ_1 后续 ==========
    {
        id: "infj_4_follow_a",
        title: "INFJ",
        desc: "我把那个梦写成了一个比喻——每个人出生时手里都握着一粒星沙，走着走着就忘了自己曾经会发光。是不是太矫情了？",
        image: "Resources/images/card/INFJ/INFJ_1.jpg",
        choiceA: {
            text: "不矫情，这个意象好美。你把它完整写出来吧，我想读。",
            effects: { ns: -2, ft: -3 },
            nextEventId: null
        },
        choiceB: {
            text: "比喻是不错，但醒来的人还是要吃饭上班。别写得太飘。",
            effects: { ns: +2, ft: +3 },
            nextEventId: null
        }
    },
    {
        id: "infj_4_follow_b",
        title: "INFJ",
        desc: "后来我又试了一次，睡前反复暗示自己回到那片海滩。结果真的成功了一半——至少海浪声还在耳边响了几秒。",
        image: "Resources/images/card/INFJ/INFJ_1.jpg",
        choiceA: {
            text: "清醒梦？你也太能探索了。那片海对你来说很特别吧。",
            effects: { ns: -3, ft: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "刻意追梦反而睡不着。早点休息比什么都强。",
            effects: { ns: +2, ft: +2 },
            nextEventId: null
        }
    },
        // ========== ENFP_5 后续 ==========
    {
        id: "enfp_5_follow_a",
        title: "ENFP",
        desc: "对吧对吧！小熊猫平时安静但关键时刻超机敏，跟你一模一样。我还给每个人都画了对应小头像，下次给你看！",
        image: "Resources/images/card/ENFP/ENFP_1.jpg",
        choiceA: {
            text: "有点期待你画的头像了。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "你是不是又把正事拖到后面了？",
            effects: {},
            nextEventId: null
        }
    },
    {
        id: "enfp_5_follow_b",
        title: "ENFP",
        desc: "逻辑嘛……就是直觉！不过你这么一问，我决定回去严肃研究一下动物学分类和人类性格的对应关系。",
        image: "Resources/images/card/ENFP/ENFP_1.jpg",
        choiceA: {
            text: "你还真打算研究啊？",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "研究完了记得发我结论。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ISTP_5 后续 ==========
    {
        id: "istp_5_follow_a",
        title: "ISTP",
        desc: "换好了，顺便把你听筒孔的灰清了一下。之前接电话声音小就是这个原因。",
        image: "Resources/images/card/ISTP/ISTP_1.jpg",
        choiceA: {
            text: "细节狂魔，谢了。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "听筒也顺便修了？牛。",
            effects: {},
            nextEventId: null
        }
    },
    {
        id: "istp_5_follow_b",
        title: "ISTP",
        desc: "你贴歪了零点几毫米，右下角有个气泡。要我帮你重贴吗？我有强迫症。",
        image: "Resources/images/card/ISTP/ISTP_1.jpg",
        choiceA: {
            text: "行吧，你来。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "歪就歪了，能用就行。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== ESFJ_5 后续 ==========
    {
        id: "esfj_5_follow_a",
        title: "ESFJ",
        desc: "外套给你挂椅背上了，蓝色的那件。明天记得穿厚点，别光顾着好看。",
        image: "Resources/images/card/ESFJ/ESFJ_1.jpg",
        choiceA: {
            text: "记下了，明天裹成粽子。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "你的也够厚吗，别自己冻着。",
            effects: {},
            nextEventId: null
        }
    },
    {
        id: "esfj_5_follow_b",
        title: "ESFJ",
        desc: "第二天你打了三个喷嚏。我泡了姜茶放你桌上了，不用说话，喝就行。",
        image: "Resources/images/card/ESFJ/ESFJ_1.jpg",
        choiceA: {
            text: "……好吧，我喝了。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "就三个喷嚏，别大惊小怪。",
            effects: {},
            nextEventId: null
        }
    },

    // ========== INTJ_5 后续 ==========
    {
        id: "intj_5_follow_a",
        title: "INTJ",
        desc: "就是这个——第三个方向，初始收入最低但五年后反超另外两个。注意看这里是拐点，因为行业门槛在那一年被政策瓦解了。",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "眼光很长远，我认真考虑。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "数据我信，但感觉还是不对。",
            effects: {},
            nextEventId: null
        }
    },
    {
        id: "intj_5_follow_b",
        title: "INTJ",
        desc: "没关系。不过如果一年后你改变主意了，这个模型我实时更新着，随时可以调出来。",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "你对数字的耐心真是惊人。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "好，留作参考，谢了。",
            effects: {},
            nextEventId: null
        }
    },
        // ========== ENTP Meta后续 ==========
    {
        id: "entp_meta_1_follow",
        title: "ENTP",
        desc: "开玩笑的，接着玩吧。",
        image: "Resources/images/card/ENTP/ENTP_1.jpg",
        choiceA: {
            text: "莫名其妙。",
            effects: {},
            nextEventId: null
        },
        choiceB: {
            text: "哈哈，行吧。",
            effects: {},
            nextEventId: null
        }
    },
        // ========== INFP_5 后续 ==========
    {
        id: "infp_5_follow_a",
        title: "INFP",
        desc: "信里有一句——'你不必成为别人期待的样子，你连自己的期待都不用成为。'写完之后轻松了好多。",
        image: "Resources/images/card/INFP/INFP_1.jpg",
        choiceA: {
            text: "这句话我能收藏吗？",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "太理想化了，现实不允许。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },
    {
        id: "infp_5_follow_b",
        title: "INFP",
        desc: "不是孤单。是和自己的对话。有些话只能对自己说，说完了才知道原来一直在等自己听见。",
        image: "Resources/images/card/INFP/INFP_1.jpg",
        choiceA: {
            text: "……突然被说中了。",
            effects: { ft: -3, ns: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "还是找真人聊聊吧。",
            effects: { ft: +2, ie: +3 },
            nextEventId: null
        }
    },

    // ========== INTJ_6 后续 ==========
    {
        id: "intj_6_follow_a",
        title: "INTJ",
        desc: "第一本选的是博弈论。读到第三章已经发现了三个可以用于工作的模型。社交圈的噪音少了，信号强了。",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "输入质量决定输出质量。",
            effects: { ns: -3, jp: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "有些灵感就是闲聊来的。",
            effects: { ns: +2, jp: +3 },
            nextEventId: null
        }
    },
    {
        id: "intj_6_follow_b",
        title: "INTJ",
        desc: "你说得对。所以我又加回去了一个群——只有四个人，每周固定话题。低密度的有效社交。",
        image: "Resources/images/card/INTJ/INTJ_1.jpg",
        choiceA: {
            text: "精准筛选，这很INTJ。",
            effects: { jp: -3, ns: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "四个也太少了。",
            effects: { jp: +2, ie: +3 },
            nextEventId: null
        }
    },

    // ========== ENFJ_5 后续 ==========
    {
        id: "enfj_5_follow_a",
        title: "ENFJ",
        desc: "他开口了——原来他不是不想说话，是一直不知道怎么插进来。吃完那顿饭，他加了我们三个人的微信。",
        image: "Resources/images/card/ENFJ/ENFJ_1.jpg",
        choiceA: {
            text: "你做了一件小事，但对他是大事。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "一次午饭改变不了太多。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },
    {
        id: "enfj_5_follow_b",
        title: "ENFJ",
        desc: "后来我观察了一下——他确实自己带耳机吃饭，偶尔还在本子上写东西。可能那就是他充电的方式。",
        image: "Resources/images/card/ENFJ/ENFJ_1.jpg",
        choiceA: {
            text: "尊重他的节奏也是关心。",
            effects: { ft: -3, ie: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "那就别管了，各自安好。",
            effects: { ft: +3, ie: +2 },
            nextEventId: null
        }
    },

    // ========== ISTJ_5 后续 ==========
    {
        id: "istj_5_follow_a",
        title: "ISTJ",
        desc: "过期药已经密封好交给社区回收点了。现在打开药箱一目了然，夜里找药不用翻半天。",
        image: "Resources/images/card/ISTJ/ISTJ_1.jpg",
        choiceA: {
            text: "这种小事累积起来就是生活品质。",
            effects: { jp: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "偶尔乱一下也无所谓。",
            effects: { jp: +4 },
            nextEventId: null
        }
    },
    {
        id: "istj_5_follow_b",
        title: "ISTJ",
        desc: "你没说错，我顺便把冰箱和鞋柜也理了。一个下午换了三个生活区的清爽，挺值的。",
        image: "Resources/images/card/ISTJ/ISTJ_1.jpg",
        choiceA: {
            text: "你这效率我羡慕了。",
            effects: { jp: -3, ft: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "别把人生都花在整理上。",
            effects: { jp: +3, ft: -2 },
            nextEventId: null
        }
    },

    // ========== ISFJ_5 后续 ==========
    {
        id: "isfj_5_follow_a",
        title: "ISFJ",
        desc: "上个月一个朋友无意中提过喜欢抹茶，我记住了。昨天他生日，我带了一块抹茶千层。他愣了三秒才说——你怎么知道的。",
        image: "Resources/images/card/ISFJ/ISFJ_1.jpg",
        choiceA: {
            text: "这种被默默记住的感觉，比什么礼物都珍贵。",
            effects: { ft: -4 },
            nextEventId: null
        },
        choiceB: {
            text: "记太多细节会累到自己。",
            effects: { ft: +4 },
            nextEventId: null
        }
    },
    {
        id: "isfj_5_follow_b",
        title: "ISFJ",
        desc: "其实不累。翻翻那些笔记，就像在看一本自己编的温暖地图。谁是芒果过敏，谁怕打雷，谁喜欢下雨。",
        image: "Resources/images/card/ISFJ/ISFJ_1.jpg",
        choiceA: {
            text: "你的温柔藏在这些小本子里了。",
            effects: { ft: -3, ie: -2 },
            nextEventId: null
        },
        choiceB: {
            text: "那你记我的准不准？",
            effects: { ft: +2, ie: +2 },
            nextEventId: null
        }
    },

    // ========== ESTP_5 后续 ==========
    {
        id: "estp_5_follow_a",
        title: "ESTP",
        desc: "照片发你了。夕阳刚好落在两栋楼之间，像被夹住的蛋黄。追了八公里就为了这一秒。",
        image: "Resources/images/card/ESTP/ESTP_1.jpg",
        choiceA: {
            text: "值了，这张能当壁纸。",
            effects: { ie: +3, jp: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "下次开车去不行吗。",
            effects: { ie: -2, jp: -3 },
            nextEventId: null
        }
    },
    {
        id: "estp_5_follow_b",
        title: "ESTP",
        desc: "酸啊，但回程的时候夜风吹着，路上没什么人，比日落还爽。有时候过程比结果有意思。",
        image: "Resources/images/card/ESTP/ESTP_1.jpg",
        choiceA: {
            text: "说得我都想骑一趟了。",
            effects: { ie: +3, jp: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "你找补得挺自然。",
            effects: { ie: +1, jp: +1 },
            nextEventId: null
        }
    },

    // ========== ESFP_5 后续 ==========
    {
        id: "esfp_5_follow_a",
        title: "ESFP",
        desc: "大姐还问我是不是学跳舞的。我说不是，就是听到那首歌忍不住。她说——那更厉害，你是被音乐选中的人。",
        image: "Resources/images/card/ESFP/ESFP_1.jpg",
        choiceA: {
            text: "被音乐选中！这个评价太酷了。",
            effects: { ie: +4 },
            nextEventId: null
        },
        choiceB: {
            text: "大姐挺会夸人的。",
            effects: { ie: +2 },
            nextEventId: null
        }
    },
    {
        id: "esfp_5_follow_b",
        title: "ESFP",
        desc: "'社死'的反面是'社活'。活着不就是为了这些想做什么就做什么的瞬间吗？",
        image: "Resources/images/card/ESFP/ESFP_1.jpg",
        choiceA: {
            text: "'社活'，我学会了。",
            effects: { ie: +3, jp: +2 },
            nextEventId: null
        },
        choiceB: {
            text: "你开心就好。",
            effects: { ie: -2, jp: -2 },
            nextEventId: null
        }
    },
];

// ========== 合并导出 ==========
window.EVENT_DATA = {
    poolSize: 8,
    mainEvents: MAIN_EVENTS,
    followUpEvents: FOLLOW_UP_EVENTS
};