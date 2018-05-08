"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tslint_1 = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoFocusedTestWalker(sourceFile, this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'no-focused-test',
        description: 'Disallows `fit`, `it.only`, `fdescribe`, `describe.only`.',
        optionsDescription: 'Not configurable.',
        options: null,
        type: 'functionality',
        typescriptOnly: true,
    };
    Rule.FAILURE_STRING = 'Focused tests are not allowed';
    return Rule;
}(tslint_1.Rules.AbstractRule));
exports.Rule = Rule;
// tslint:disable max-classes-per-file
var NoFocusedTestWalker = /** @class */ (function (_super) {
    __extends(NoFocusedTestWalker, _super);
    function NoFocusedTestWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoFocusedTestWalker.prototype.visitCallExpression = function (node) {
        var nodeText = node.getText();
        if (nodeText.indexOf('it.only') === 0 ||
            nodeText.indexOf('describe.only') === 0 ||
            nodeText.indexOf('fit') === 0 ||
            nodeText.indexOf('fdescribe') === 0) {
            this.addFailure(this.createFailure(node.getStart(), 1, Rule.FAILURE_STRING));
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return NoFocusedTestWalker;
}(tslint_1.RuleWalker));
