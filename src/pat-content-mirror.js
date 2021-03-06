import $ from "jquery";
import _ from "underscore";
import Base from "@patternslib/patternslib/src/core/base";
import Parser from "@patternslib/patternslib/src/core/parser";

const parser = new Parser("content-mirror");
parser.add_argument("target");

export default Base.extend({
    name: "content-mirror",
    trigger: ".pat-content-mirror",
    defaults: {
        target: "p.content-mirror .text",
    },

    init: function content_mirror_init($el, opts) {
        const options = parser.parse($el, opts, true)[0];
        this.options = _.extend(_.clone(this.defaults), options);
        const $mirror = $(this.options.target).parents("p.content-mirror").first();
        $el.on(
            "input propertychange",
            $.proxy(this.updateMirror, this, this.options.target)
        );
        $el.parents("form")
            .first()
            .on("reset", function () {
                $el.val("");
                $mirror.html($mirror.html());
            });
        $(".placeholder", this.options.target).text($el.attr("placeholder") || "");
    },

    updateMirror: function updateMirror(target, ev) {
        const $el = $(ev.target);
        const the_mirror = $(target);
        the_mirror.text($el.val());
        if (!$el.val().length) {
            const placeholder = $el.attr("placeholder");
            if (placeholder) {
                the_mirror.html('<em class="placeholder">' + placeholder + "</em>");
            }
        }
    },
});
