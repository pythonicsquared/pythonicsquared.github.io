---
title: PEP8 is NOT good enough!
description: |
    A Pythonic guide to semantic underscores inside variable and function names.
    Improve code readability and convey mutability in your Python projects.
---


## RFC
## PEP 8.1 – Semantic Underscores for Variable and Function Names

**Author:** Pythonic Squared

**Status:** Draft

**Type:** Informational

**Created:** 2025-11-06

**Python-Version:** 3.x


## Abstract

This PEP proposes a naming convention that embeds **semantic information about mutability and complexity** directly into variable and function names. The proposal maintains compliance with existing PEP8 rules while providing guidance for improved readability, particularly in codebases with nested or complex structures.


## 1. Rationale

PEP8 provides guidance on naming conventions, whitespace, and general style, but it does not convey the **semantic role of variables or functions**. Developers often rely on implicit knowledge or external documentation to determine whether a variable is immutable, mutable, or represents a more complex structure.

PEP 8.1 introduces **semantic underscores** placed **inside snake_case names**, providing a structured and consistent mechanism to communicate variable semantics while remaining fully compliant with existing PEP8 rules. This approach improves **readability and maintainability**, particularly in codebases with nested or complex data structures.


## 2. Semantic Underscore Convention

**Scope:** Semantic underscores appear **inside snake_case names**. Leading or trailing underscores remain reserved for Python’s special methods and attributes.

| Semantic Underscore | Meaning                                  |
| ------------------- | --------------------------- |
| _      | Immutable value                          |
| __     | Mutable value                            |
| ___    | Compound structure (e.g., dict of dicts, nested lists)    |
| ________   | Class instance                           |

**Examples:**

```python
pi_single = 3.14159                  # Immutable
counter__mutable = 0                 # Mutable
config___nested = {                  # Nested structures
    'db': {
        'host': 'localhost'
    }
}
user____instance = User('Alice')     # Class instance
```

**Notes:**

* Semantic underscores appear **inside the identifier**, never at the start or end.
* Leading or trailing underscores retain their usual meaning; this PEP does not assign semantic meaning to them.
* The convention applies equally to **all variables and functions**, independent of public or private scope.


## 3. Implementation

* **Guidelines:** Developers are encouraged to apply semantic underscores consistently within a module or project to maximize readability.
* **Tooling support:** Linters and IDEs may provide warnings when semantic underscores are misused or inconsistent.
* **Optional adoption:** While recommended for clarity, semantic underscores are informational and do not affect runtime behavior.


## 4. Compatibility

This proposal does **not change Python syntax or semantics** and is fully compatible with existing PEP8 naming conventions. No runtime behavior is affected.


## 5. Conclusion

PEP 8.1 extends Python’s philosophy of **readability, clarity, and explicit intention** by embedding semantic cues directly into variable and function names. Semantic underscores provide a subtle but powerful mechanism for conveying **mutability and structural complexity**, enhancing the comprehensibility of code while remaining fully compliant with PEP8.

By adopting this convention, developers honor Python’s enduring commitment to **clean, expressive, and self-documenting code**, allowing identifiers themselves to carry meaning and purpose. In this way, PEP 8.1 is not merely a style guide—it is a **PEPful continuation of Python’s guiding principles**.

> “Let your code speak not only in logic, but in intention; let every underscore carry meaning, and every name tell a story.”

---

**Comments (20):**


> `@guido_fan`:
> I appreciate the rigor here. Embedding mutability and structural information in identifiers could improve readability for complex modules.

> `@underscore_enthusiast`:
> The idea of multiple underscores inside snake_case is delightfully PEPful. I wonder if ___nested might get out of hand in very deep structures.

> `@lintmaster`:
> From a tooling perspective, I can see this being easy to enforce. Linters could provide helpful warnings for inconsistent semantic underscores.

> `@pythonic_newbie`:
> I’m not sure I fully get the distinction between __mutable and ___nested. Some examples with functions would help clarify.

> `@zen_coder`:
> This feels like a natural extension of Python’s philosophy. Every underscore carrying intention… very meditative.

> `@code_reviewer42`:
> Will this convention scale well in large teams? I can see potential for debate over how many underscores are appropriate in each context.

> `@legacy_lover`:
> Curious if there are any backward compatibility concerns with existing snake_case-heavy codebases. Seems safe, but worth noting.

> `@syntax_savant`:
> Personally, I would have liked a note on semantic underscores in function names. Otherwise, this is a clever way to encode internal structure.

> `@fun_with_underscores`:
> Honestly, I just enjoy counting the underscores. ____instance looks like a badge of honor.

> `@meta_mage`:
> This RFC reads seriously enough that you could almost submit it. The absurdity only hits when you try to adopt it fully. Brilliant.

> `@deep_dict_diver`:
> My team tried ___nested last week. By the third level I was hallucinating dictionaries inside dictionaries. PEPful or madness?

> `@mutable_mary`:
> Are semantic underscores for mutable variables really necessary? We survived decades without them. Then again… maybe we just didn’t know we needed them.

> `@underscore_apprentice`:
> So, if I see counter__mutable in a function, I instantly know it can change. I love this clarity, even if it’s a bit… extreme.

> `@dict_dragon`:
> Can we have a semantic underscore for sets of dicts? Asking for a friend… or perhaps a nested structure of dictionaries inside sets. I’m scared.

> `@function_fanatic`:
> Function names with semantic underscores could be hilarious: calculate_sum__mutable()? I’m torn between adopting and laughing.

> `@pylint_overlord`:
> IDEs will hate us. Linter plugins will explode. But in the PEPful sense, this is kind of beautiful.

> `@underscore_zealot`:
> We need a convention for four underscores plus for objects that contain other objects with semantic underscores. Otherwise it’s incomplete.

> `@realistic_rick`:
> I like the idea, but I feel like one could spend more time naming variables than writing code. Still, the clarity is undeniable.

> `@duck_dev42`:
> I just want to say: Python and ducks agree. Counting underscores is far more satisfying than counting bugs.

> `@meta_mage`:
> Honestly, we might be witnessing the birth of the “underscore cult.” I approve.
