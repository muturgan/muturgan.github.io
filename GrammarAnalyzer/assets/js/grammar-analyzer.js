class GrammarAnalyzer {
    constructor() {
        this._ONE = '1';
        this._ZERO = '0';
        this._NOT = '!';
        this._AND = '&&';
        this._HALF_AND = '&';
        this._OR = '||';
        this._HALF_OR = '|';
        this._lexems = [this._ONE, this._ZERO, this._NOT, this._AND, this._OR];
        this._alphabet = [this._ONE, this._ZERO, this._NOT, this._HALF_AND, this._HALF_OR];
        this._operands = [this._ONE, this._ZERO];
        this._operators = [this._NOT, this._AND, this._OR];
    }
    checkExpression(expression) {
        try {
            const lexems = this._getLexems(expression);
            this._checkSyntax(lexems);
            return {
                success: true,
                message: 'expression is correct ;)',
            };
        }
        catch (err) {
            return {
                success: false,
                message: err.message,
            };
        }
    }
    _getLexems(expression) {
        const dried = expression
            .split('')
            .filter(l => l !== ' ')
            .join('');
        const expressionLexems = [];
        let currentLexem = '';
        for (let i = 0; i < dried.length; i++) {
            currentLexem += dried[i];
            if (this._lexems.includes(currentLexem)) {
                expressionLexems.push(currentLexem);
                currentLexem = '';
                continue;
            }
            if (!this._alphabet.includes(currentLexem)) {
                throw new Error(`unknown lexem ${currentLexem}`);
            }
        }
        if (!expressionLexems.length) {
            throw new Error('empty expression');
        }
        return expressionLexems;
    }
    _checkSyntax(splitedExpression) {
        let [nextLexem, lexems] = this._getNextLexem(splitedExpression);
        while (nextLexem) {
            switch (true) {
                case nextLexem === this._NOT:
                    [nextLexem, lexems] = this._handleNot(lexems); // operand
                    break;
                case this._operands.includes(nextLexem):
                    [nextLexem, lexems] = this._handleOperand(lexems);
                    break;
                case nextLexem === this._OR || nextLexem === this._AND:
                    [nextLexem, lexems] = this._handleCondition(lexems);
                    break;
                default:
                    throw new Error(`something wrong with grammar checking. lexem is ${nextLexem}`);
            }
        }
    }
    _getNextLexem(lexems) {
        const [first, ...rest] = lexems;
        return [first, rest];
    }
    _handleNot(Lexems) {
        let [nextLexem, lexems] = this._getNextLexem(Lexems);
        while (nextLexem === this._NOT) {
            [nextLexem, lexems] = this._getNextLexem(lexems);
        }
        if (!nextLexem || !this._operands.includes(nextLexem)) {
            throw new Error('next lexem after ! should be an operand (0 or 1)');
        }
        return [nextLexem, lexems];
    }
    _handleOperand(Lexems) {
        const [nextLexem, lexems] = this._getNextLexem(Lexems);
        if (nextLexem && nextLexem !== this._OR && nextLexem !== this._AND) {
            throw new Error(`next lexem after operand should be && or || (if it is not an expression's end)`);
        }
        return [nextLexem, lexems];
    }
    _handleCondition(Lexems) {
        const [nextLexem, lexems] = this._getNextLexem(Lexems);
        if (!nextLexem || (nextLexem !== this._NOT && !this._operands.includes(nextLexem))) {
            throw new Error(`next lexem after condition oprator should be an operand (1 or 0) or a NOT operator`);
        }
        return [nextLexem, lexems];
    }
}
const grammarAnalyzer = new GrammarAnalyzer();
