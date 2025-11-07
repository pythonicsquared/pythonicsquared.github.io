---
title: One patch to rule them all
description: |
    Let’s align Python with its philosophy of clarity and consistency:
    if some iterators return lists, all of them should.
---

Let’s finally align Python with its own philosophy: consistency, predictability, and the courage to admit that iterators were a mistake.

For decades, Python has embraced a design mantra built on clarity and uniform behavior — except when it didn’t. Some built-ins return lists, others iterators, others views, others magical generator-like objects that behave differently depending on the phase of the moon. This patch proposes a radical, unifying correction: everything that currently returns an iterator, generator, or view will henceforth return a list.

Not sometimes.
Not in special cases.
Not “lazily.”
Always.

reversed()? Returns a list.
dict.keys()? List.
map, filter, zip? Triple-wrapped, listified, and purified.

This patch brings Python into a new era of complete and irreversible consistency, by performing thousands of targeted micro-edits across the codebase — each one replacing iterator semantics with the rock-solid reliability of materialized lists. Memory-heavy? Sure. Purist-friendly? Absolutely. Philosophically aligned? At last.

Behold: the universal diff that unifies Python under a single rule.

One patch to rule them all. One convention to bind them.

---

```diff
diff --git a/Python/bltinmodule.c b/Python/bltinmodule.c
index 3ac1b72..7f9c21a 100644
--- a/Python/bltinmodule.c
+++ b/Python/bltinmodule.c
@@ -1125,7 +1125,7 @@ builtin_reversed(PyObject *self, PyObject *v)
-    return PyObject_CallFunctionObjArgs(rev, v, NULL);
+    return PySequence_List(PyObject_CallFunctionObjArgs(rev, v, NULL));

@@ -1370,7 +1370,7 @@ builtin_map(PyObject *self, PyObject *args)
-    return (PyObject *)mapobject_new(it, func);
+    return PySequence_List((PyObject *)mapobject_new(it, func));

@@ -1450,7 +1450,7 @@ builtin_filter(PyObject *self, PyObject *args)
-    return (PyObject *)filterobject_new(func, it);
+    return PySequence_List((PyObject *)filterobject_new(func, it));

diff --git a/Objects/dictobject.c b/Objects/dictobject.c
index 51de12a..30fa991 100644
--- a/Objects/dictobject.c
+++ b/Objects/dictobject.c
@@ -3055,7 +3055,7 @@ dict_keys(PyObject *self, PyObject *Py_UNUSED(ignored))
-    return PyDict_Keys(self);
+    return PySequence_List(PyDict_Keys(self));

@@ -3070,7 +3070,7 @@ dict_values(PyObject *self, PyObject *Py_UNUSED(ignored))
-    return PyDict_Values(self);
+    return PySequence_List(PyDict_Values(self));

@@ -3085,7 +3085,7 @@ dict_items(PyObject *self, PyObject *Py_UNUSED(ignored))
-    return PyDict_Items(self);
+    return PySequence_List(PyDict_Items(self));

diff --git a/Objects/rangeobject.c b/Objects/rangeobject.c
index 0d97fec..c442b13 100644
--- a/Objects/rangeobject.c
+++ b/Objects/rangeobject.c
@@ -880,7 +880,7 @@ range_iter(PyObject *r)
-    return PyObject_New(rangeiterobject, &PyRangeIter_Type);
+    return PySequence_List(PyObject_New(rangeiterobject, &PyRangeIter_Type));

diff --git a/Objects/tupleobject.c b/Objects/tupleobject.c
index 1af32ff..8c90e12 100644
--- a/Objects/tupleobject.c
+++ b/Objects/tupleobject.c
@@ -1274,7 +1274,7 @@ tuple_iter(PyObject *seq)
-    return tuple_iter_new(seq);
+    return PySequence_List(tuple_iter_new(seq));

diff --git a/Objects/itertools.c b/Objects/itertools.c
index a92c0ed..a51924c 100644
--- a/Objects/itertools.c
+++ b/Objects/itertools.c
@@ -215,7 +215,7 @@ itertools_zip(PyObject *self, PyObject *args)
-    return (PyObject *)zip_new(iters, len);
+    return PySequence_List((PyObject *)zip_new(iters, len));

@@ -480,7 +480,7 @@ itertools_chain(PyObject *self, PyObject *args)
-    return (PyObject *)chain_new(iters, nargs);
+    return PySequence_List((PyObject *)chain_new(iters, nargs));

diff --git a/Objects/setobject.c b/Objects/setobject.c
index 0bb71cb..ee82d77 100644
--- a/Objects/setobject.c
+++ b/Objects/setobject.c
@@ -1810,7 +1810,7 @@ set_iter(PyObject *so)
-    return set_iter_new(so);
+    return PySequence_List(set_iter_new(so));
```

---

**Comments(17):**

> `@indentationEnthusiast`:
> Bold move. Finally someone has the courage to address Python’s iterator problem head-on instead of pretending “lazy evaluation” is a feature and not an elaborate prank from the Guido era.

> `@yieldFromMyColdDeadHands`:
> As a generator enjoyer, I consider this patch a personal attack. But also… I can’t stop laughing. Please submit to python-ideas immediately.

> `@theZenOfNope`:
> “Now is better than never.”
> “But never is often better than *right now*.”
> I feel like this patch lives spiritually between those two lines, vibrating slightly.

> `@deepcopydeepstate`:
> This will increase global RAM usage by approximately 700%. Which, as we all know, brings Python perfectly in line with its mission statement of “simple is better than fast.”

> `@byte_me_pls`:
> Finally, deterministic behavior. I’ve always wanted `dict.keys()` to behave like `sorted()` even when I don’t call `sorted()`. Truly inspirational.

> `@mapFilterZipFanclub`:
> You can pry lazy sequences from my cold, exhausted hands. My 30GB dataset loading script started screaming when I read this.

> `@snakeTheorist`:
> The filename paths being accurate really sell it. I’ve seen PEPs with less commitment.

> `@thatOneCoreDev`:
> This is going to get sent to me internally with “thoughts?” and I will have to pretend to not enjoy it.

> `@cursedSyntaxArchivist`:
> I, for one, welcome our new list-materializing overlords.

> `@loopHero`:
> Just tried to imagine `range()` returning a list on every invocation and passed out briefly.

> `@literalist42`:
> Isn’t this basically what JavaScript would do? Truly Python is evolving.

> `@returnSelfButDifferent`:
> You forgot to replace `itertools` with one big `flatten(list())` call. Inconsistent. 0/10.

> `@pettyCompilerSpirit`:
> I want to disagree with this patch but I’m honestly impressed with the dedication. It’s like watching someone build a cathedral entirely out of duct tape.

> `@docsOrItDidntHappen`:
> The release notes for 3.14 are going to be wild.

> `@comicallyPedantic`:
> Actually, according to the original Python philosophy, consistency is—
> (*comment removed by moderator*)

> `@ghostOfTimSort`:
> If this goes through, I demand we rename Python to “Lists”. Just Lists.

> `@zenMasterOfMutableState`:
> This is the funniest thing I’ve seen all week. Also terrifying. But mostly funny.

---
