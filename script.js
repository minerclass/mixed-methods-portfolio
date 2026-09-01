(function () {
    var nav = document.querySelector(".nav-content");
    var links = document.querySelector(".nav-links");

    if (nav && links) {
        var toggle = document.createElement("button");
        toggle.className = "menu-toggle";
        toggle.type = "button";
        toggle.setAttribute("aria-label", "Open navigation");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        nav.appendChild(toggle);

        toggle.addEventListener("click", function () {
            var isOpen = links.classList.toggle("is-open");
            document.body.classList.toggle("menu-open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        });

        links.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                links.classList.remove("is-open");
                document.body.classList.remove("menu-open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.setAttribute("aria-label", "Open navigation");
            });
        });
    }

    var animatedItems = document.querySelectorAll(".fade-up");

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        animatedItems.forEach(function (item) {
            observer.observe(item);
        });
    } else {
        animatedItems.forEach(function (item) {
            item.classList.add("is-visible");
        });
    }

    if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
    }
})();


/* ---- Interactive joint display -------------------------------------------
   Renders the joint display for the selected research question. Cells describe
   where evidence will sit and what integration will ask of it. Nothing here
   asserts a finding: the study is at proposal stage and no data exists. The
   outcome vocabulary (convergence, expansion, divergence, silence) is the
   study's own, matching Phase 3 of the design. */
(function () {
    var body = document.getElementById("jdBody");
    if (!body) return;

    var questionEl = document.getElementById("jdQuestion");
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".jd-tab"));

    var DATA = {
        rq1: {
            question: "RQ1. How do classroom-facing educators, building-level administrators, district or system-level leaders, and adult university students make sense of the ways generative AI changes the effort, dialogue, authorship, judgment, and participation involved in teaching and learning?",
            rows: [
                ["Noetic \u00b7 effort",
                 "Interview accounts of where thinking is described as skipped, shortened, or preserved.",
                 "Survey items on how often and for what purposes AI is used in drafting, summarising, and explanation.",
                 "Do accounts of skipped thinking line up with reported patterns of use, or only with certain roles?"],
                ["Rhetorical \u00b7 dialogue",
                 "Accounts of what happens to critique, revision, and discussion when a draft arrives already finished.",
                 "Items on the assignment and assessment formats currently in use.",
                 "Does reported practice match the described experience of revision, or is one strand silent on it?"],
                ["Existential \u00b7 authorship",
                 "Accounts of ownership, attribution, and being able to stand behind a claim under questioning.",
                 "Items on awareness of integrity expectations and attribution norms.",
                 "Where does felt authorship diverge from what policy assumes about authorship?"]
            ]
        },
        rq2: {
            question: "RQ2. How do educators and school-system leaders make sense of and respond to the policy, professional-learning, assessment, access, and governance conditions surrounding generative AI?",
            rows: [
                ["Policy presence",
                 "Leader and educator accounts of what guidance exists and how clear it proves in practice.",
                 "Items on policy presence and clarity, read alongside NCES School Pulse Panel and RAND structural context.",
                 "Does the national structural picture converge with what this setting reports about itself?"],
                ["Professional learning",
                 "Accounts of what training was offered, what it addressed, and what it left unaddressed.",
                 "Items on professional learning received and its stated focus.",
                 "Convergence, or a gap between what was provided and what proved usable?"],
                ["Access conditions",
                 "Accounts of device models, filtering, and who can actually use which tools under what conditions.",
                 "Items on tool availability and access constraints.",
                 "Do access constraints appear in one strand and go unmentioned in the other?"]
            ]
        },
        rq3: {
            question: "RQ3. What language, assessment expectations, instructional practices, professional supports, and leadership approaches do educators and school-system leaders identify as important for preserving forms of friction that support learning while reducing unnecessary barriers?",
            rows: [
                ["Assessment redesign",
                 "Accounts of what educators would change about assessment if they had institutional permission.",
                 "Items on current assessment formats and perceived latitude to change them.",
                 "Do the changes people want align with the latitude they report actually having?"],
                ["Shared language",
                 "The vocabulary participants themselves use for difficulty that helps versus difficulty that excludes.",
                 "Items on familiarity with framework terms.",
                 "Silence is informative here: terms alive in one strand may be absent from the other."],
                ["Leadership supports",
                 "Accounts of what institutional permission to preserve friction would concretely look like.",
                 "Items on leadership signals, expectations, and stated priorities.",
                 "Expansion: what interviews surface that a closed-ended item could not have asked."]
            ]
        }
    };

    function render(key) {
        var set = DATA[key];
        if (!set) return;

        body.innerHTML = "";
        set.rows.forEach(function (r) {
            var tr = document.createElement("tr");

            var th = document.createElement("th");
            th.scope = "row";
            th.textContent = r[0];
            tr.appendChild(th);

            ["c-qual", "c-quan", "c-int"].forEach(function (cls, i) {
                var td = document.createElement("td");
                td.className = cls;
                td.textContent = r[i + 1];
                tr.appendChild(td);
            });

            body.appendChild(tr);
        });

        if (questionEl) questionEl.textContent = set.question;
        tabs.forEach(function (t) {
            t.setAttribute("aria-pressed", t.dataset.rq === key ? "true" : "false");
        });
    }

    tabs.forEach(function (t) {
        t.addEventListener("click", function () { render(t.dataset.rq); });
    });

    render("rq1");
})();
