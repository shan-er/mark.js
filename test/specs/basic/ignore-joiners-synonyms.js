/*!***************************************************
 * mark.js
 * https://github.com/julmot/mark.js
 * Copyright (c) 2014–2017, Julian Motz
 * Released under the MIT license https://git.io/vwTVl
 *****************************************************/
"use strict";
define([
    "basic/array-keyword", "basic/ignore-joiners-synonyms", "basic/synonyms"
], function () {
    describe("basic mark with ignoreJoiners and synonyms", function () {
        var $ctx1, $ctx2;
        beforeEach(function (done) {
            loadFixtures("basic/ignore-joiners-synonyms.html");

            $ctx1 = $(".basic-ignore-joiners-synonyms > div:nth-child(1)");
            $ctx2 = $(".basic-ignore-joiners-synonyms > div:nth-child(2)");
            new Mark($ctx1[0]).mark("Lorem", {
                "synonyms": {
                    "Lorem": "ipsum"
                },
                "separateWordSearch": false,
                "diacritics": false,
                "ignoreJoiners": true,
                "done": function () {
                    new Mark($ctx2[0]).mark(["one", "dos", "lüfte"], {
                        "separateWordSearch": false,
                        "diacritics": false,
                        "ignoreJoiners": true,
                        "synonyms": {
                            "ü": "ue",
                            "one": "uno",
                            "two": "dos"
                        },
                        "done": done
                    });
                }
            });
        });

        it("should wrap synonyms", function () {
            expect($ctx1.find("mark")).toHaveLength(8);
            expect($ctx2.find("mark")).toHaveLength(8);
        });
    });
});
