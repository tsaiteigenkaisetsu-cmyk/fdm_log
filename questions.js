// 簿記3級 仕訳練習問題データ
const questions = [
    {
        id: 1,
        category: "現金・商品売買",
        difficulty: "基本",
        text: "現金¥100,000で商品を仕入れた。",
        debitAccount: "商品",
        debitAmount: 100000,
        creditAccount: "現金",
        creditAmount: 100000,
        explanation: "商品を仕入れたので、商品勘定が増える（借方）。現金で支払ったので、現金勘定が減る（貸方）。",
        point: "商品の仕入は商品勘定で記帳します。現金支払いなので現金が減ります。"
    },
    {
        id: 2,
        category: "現金・売上",
        difficulty: "基本",
        text: "商品を現金¥50,000で売上げた。",
        debitAccount: "現金",
        debitAmount: 50000,
        creditAccount: "売上",
        creditAmount: 50000,
        explanation: "売上が発生したので、売上勘定が増える（貸方）。現金で代金を受け取ったので、現金勘定が増える（借方）。",
        point: "売上は貸方。現金受け取りは借方。"
    },
    {
        id: 3,
        category: "売掛金",
        difficulty: "基本",
        text: "商品を掛けで¥80,000売上げた。",
        debitAccount: "売掛金",
        debitAmount: 80000,
        creditAccount: "売上",
        creditAmount: 80000,
        explanation: "売上が発生したので、売上勘定が増える（貸方）。代金をまだ受け取っていないので、売掛金勘定が増える（借方）。",
        point: "掛け売上では、売掛金で記帳します。今後代金を受け取ったときに現金が増えます。"
    },
    {
        id: 4,
        category: "買掛金",
        difficulty: "基本",
        text: "商品を掛けで¥60,000仕入れた。",
        debitAccount: "商品",
        debitAmount: 60000,
        creditAccount: "買掛金",
        creditAmount: 60000,
        explanation: "商品を仕入れたので、商品勘定が増える（借方）。代金をまだ支払っていないので、買掛金勘定が増える（貸方）。",
        point: "掛け仕入では、買掛金で記帳します。今後代金を支払ったときに現金が減ります。"
    },
    {
        id: 5,
        category: "売掛金",
        difficulty: "基本",
        text: "売掛金¥70,000を現金で回収した。",
        debitAccount: "現金",
        debitAmount: 70000,
        creditAccount: "売掛金",
        creditAmount: 70000,
        explanation: "売掛金から代金が入ってきたので、現金勘定が増える（借方）。売掛金が減る（貸方）。",
        point: "売上時に売掛金で記帳したものを、ここで現金に変える処理です。"
    },
    {
        id: 6,
        category: "買掛金",
        difficulty: "基本",
        text: "買掛金¥90,000を現金で支払った。",
        debitAccount: "買掛金",
        debitAmount: 90000,
        creditAccount: "現金",
        creditAmount: 90000,
        explanation: "買掛金を支払うので、買掛金勘定が減る（借方）。現金で支払うので、現金勘定が減る（貸方）。",
        point: "仕入時に買掛金で記帳したものを、ここで現金で支払う処理です。"
    },
    {
        id: 7,
        category: "固定資産",
        difficulty: "やや難",
        text: "建物用に土地を現金¥500,000で購入した。",
        debitAccount: "土地",
        debitAmount: 500000,
        creditAccount: "現金",
        creditAmount: 500000,
        explanation: "土地を購入したので、土地勘定が増える（借方）。現金で支払ったので、現金勘定が減る（貸方）。",
        point: "土地は固定資産であり、繰り返し仕訳を練習する際に注意すべき勘定です。"
    },
    {
        id: 8,
        category: "費用",
        difficulty: "やや難",
        text: "水道光熱費を現金¥15,000で支払った。",
        debitAccount: "水道光熱費",
        debitAmount: 15000,
        creditAccount: "現金",
        creditAmount: 15000,
        explanation: "費用が発生したので、水道光熱費勘定が増える（借方）。現金で支払ったので、現金勘定が減る（貸方）。",
        point: "水道光熱費などの費用は、発生したときに借方で記帳します。"
    },
    {
        id: 9,
        category: "費用",
        difficulty: "やや難",
        text: "家賃を月額¥40,000、現金で支払った。",
        debitAccount: "家賃",
        debitAmount: 40000,
        creditAccount: "現金",
        creditAmount: 40000,
        explanation: "家賃費用が発生したので、家賃勘定が増える（借方）。現金で支払ったので、現金勘定が減る（貸方）。",
        point: "家賃は毎月発生する費用。毎月この仕訳を記帳します。"
    },
    {
        id: 10,
        category: "費用",
        difficulty: "基本",
        text: "広告宣伝費を現金¥25,000で支払った。",
        debitAccount: "広告宣伝費",
        debitAmount: 25000,
        creditAccount: "現金",
        creditAmount: 25000,
        explanation: "広告宣伝費が発生したので、広告宣伝費勘定が増える（借方）。現金で支払ったので、現金勘定が減る（貸方）。",
        point: "広告宣伝費は営業活動に関連する費用です。" 
    },
    {
        id: 11,
        category: "借入金",
        difficulty: "基本",
        text: "銀行から現金¥300,000を借り入れた。",
        debitAccount: "現金",
        debitAmount: 300000,
        creditAccount: "借入金",
        creditAmount: 300000,
        explanation: "現金を借り入れたので、現金勘定が増える（借方）。返済義務が生じたので、借入金勘定が増える（貸方）。",
        point: "借入金は負債です。負債が増えると貸方に記帳します。"
    },
    {
        id: 12,
        category: "借入金",
        difficulty: "基本",
        text: "借入金¥200,000を現金で返済した。",
        debitAccount: "借入金",
        debitAmount: 200000,
        creditAccount: "現金",
        creditAmount: 200000,
        explanation: "借入金を返済するので、借入金勘定が減る（借方）。現金で支払ったので、現金勘定が減る（貸方）。",
        point: "借入金の返済は、負債が減る処理です。"
    },
    {
        id: 13,
        category: "利息",
        difficulty: "やや難",
        text: "借入金の利息¥5,000を現金で支払った。",
        debitAccount: "支払利息",
        debitAmount: 5000,
        creditAccount: "現金",
        creditAmount: 5000,
        explanation: "利息は費用なので、支払利息勘定が増える（借方）。現金で支払ったので、現金勘定が減る（貸方）。",
        point: "利息は費用です。支払利息勘定を使用します。"
    },
    {
        id: 14,
        category: "設備・備品",
        difficulty: "やや難",
        text: "事務所用の机を現金¥30,000で購入した。",
        debitAccount: "備品",
        debitAmount: 30000,
        creditAccount: "現金",
        creditAmount: 30000,
        explanation: "備品を購入したので、備品勘定が増える（借方）。現金で支払ったので、現金勘定が減る（貸方）。",
        point: "備品は固定資産。土地や建物と同様に考えます。"
    },
    {
        id: 15,
        category: "現金・預金",
        difficulty: "基本",
        text: "現金¥50,000を銀行に預金した。",
        debitAccount: "預金",
        debitAmount: 50000,
        creditAccount: "現金",
        creditAmount: 50000,
        explanation: "銀行に預けたので、預金勘定が増える（借方）。現金が銀行に移ったので、現金勘定が減る（貸方）。",
        point: "現金から預金への変更は、現金が減り、預金が増えます。"
    },
    {
        id: 16,
        category: "現金・預金",
        difficulty: "基本",
        text: "銀行から現金¥80,000を引き出した。",
        debitAccount: "現金",
        debitAmount: 80000,
        creditAccount: "預金",
        creditAmount: 80000,
        explanation: "銀行から現金を引き出したので、現金勘定が増える（借方）。預金が減るので、預金勘定が減る（貸方）。",
        point: "預金から現金への変更。預金が減り、現金が増えます。"
    },
    {
        id: 17,
        category: "商品売買",
        difficulty: "基本",
        text: "売上済みの商品が返品され、現金¥20,000を返金した。",
        debitAccount: "売上返品",
        debitAmount: 20000,
        creditAccount: "現金",
        creditAmount: 20000,
        explanation: "売上が取り消されるので、売上返品勘定が増える（借方）。現金を返金したので、現金勘定が減る（貸方）。",
        point: "売上返品は売上を減らす勘定です。"
    },
    {
        id: 18,
        category: "商品売買",
        difficulty: "基本",
        text: "仕入済みの商品が返品され、商品代金現金¥15,000を返してもらった。",
        debitAccount: "現金",
        debitAmount: 15000,
        creditAccount: "仕入返品",
        creditAmount: 15000,
        explanation: "仕入が取り消されるので、仕入返品勘定が増える（貸方）。商品代金を返してもらったので、現金勘定が増える（借方）。",
        point: "仕入返品は仕入を減らす勘定です。"
    },
    {
        id: 19,
        category: "雑費",
        difficulty: "やや難",
        text: "事務用品を現金¥3,000で購入した。",
        debitAccount: "消耗品費",
        debitAmount: 3000,
        creditAccount: "現金",
        creditAmount: 3000,
        explanation: "消耗品を購入したので、消耗品費勘定が増える（借方）。現金で支払ったので、現金勘定が減る（貸方）。",
        point: "少額の雑費は消耗品費で記帳します。"
    },
    {
        id: 20,
        category: "売上",
        difficulty: "やや難",
        text: "クレジットカード売上¥35,000。手数料¥2,000は差引。",
        debitAccount: "現金",
        debitAmount: 33000,
        creditAccount: "売上",
        creditAmount: 35000,
        explanation: "売上は全額（35,000）が貸方。手数料を差引いた現金33,000が借方。不足分の2,000は新しい勘定で埋める必要があります（この例では省略）。",
        point: "クレジットカード手数料は複雑になるため、やや難です。"
    }
];

// 勘定科目の一覧（プルダウン用）
const accounts = [
    "現金",
    "預金",
    "商品",
    "売掛金",
    "買掛金",
    "売上",
    "仕入",
    "売上返品",
    "仕入返品",
    "土地",
    "建物",
    "備品",
    "固定資産",
    "家賃",
    "水道光熱費",
    "広告宣伝費",
    "支払利息",
    "消耗品費",
    "借入金",
    "資本金"
];

// カテゴリー別に問題をフィルタリング
function getQuestionsByCategory(category) {
    return questions.filter(q => q.category === category);
}

// 難易度別に問題をフィルタリング
function getQuestionsByDifficulty(difficulty) {
    return questions.filter(q => q.difficulty === difficulty);
}

// ランダムに問題を取得
function getRandomQuestion(questionsArray = questions) {
    return questionsArray[Math.floor(Math.random() * questionsArray.length)];
}

// 複数の問題をランダムに取得
function getRandomQuestions(count = 10, questionsArray = questions) {
    const shuffled = [...questionsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}
