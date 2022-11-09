import { _ as __nuxt_component_1 } from './Loader.99f1410e.mjs';
import { _ as _sfc_main$d } from './Button.03c55e24.mjs';
import { openBlock, createElementBlock, mergeProps, createCommentVNode, withModifiers, normalizeClass, Fragment, renderList, renderSlot, withKeys, createTextVNode, toDisplayString, createElementVNode, toRefs, getCurrentInstance, ref, computed, watch, nextTick, onMounted, useSSRContext, createApp, defineComponent, withAsyncContext, unref, withCtx, createVNode, isRef, createBlock, withDirectives, vModelText } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderSlot, ssrLooseContain } from 'vue/server-renderer';
import { Extension as Extension$1, useEditor, EditorContent, BubbleMenu, VueRenderer } from '@tiptap/vue-3';
import { Node, Extension, Mark, mergeAttributes, markPasteRule, combineTransactionSteps, getChangedRanges, getMarksBetween, findChildrenInRange, getAttributes } from '@tiptap/core';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import { Plugin, TextSelection, PluginKey, Selection } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import Focus from '@tiptap/extension-focus';
import History from '@tiptap/extension-history';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Suggestion from '@tiptap/suggestion';
import tippy from 'tippy.js';
import Code$1 from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import CodeBlockLowLight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { registerCustomProtocol, reset, find, test } from 'linkifyjs';
import { _ as _sfc_main$e } from './Modal.f98003a6.mjs';
import { a as useSupabaseUser, b as useSupabaseClient, l as useRoute, m as navigateTo } from '../server.mjs';
import { a as useLocalStorage, u as useMagicKeys, b as useFileDialog, c as useBase64, o as onKeyStroke, d as onClickOutside } from './index.de9279c0.mjs';
import { findParentNodeOfType } from 'prosemirror-utils';
import { Slice, Fragment as Fragment$1 } from 'prosemirror-model';
import { ReplaceStep } from 'prosemirror-transform';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { u as useAsyncData } from './asyncData.b47cc6d5.mjs';
import { u as useCustomHead } from './head.57e126bf.mjs';
import { stripHtml } from 'string-strip-html';
import slugify from 'slugify';
import './Logo.0cc12086.mjs';
import './_plugin-vue_export-helper.a1a6add7.mjs';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import 'vue-router';
import 'defu';
import 'events';
import 'unenv/runtime/npm/debug';
import 'util';
import 'crypto';
import 'url';
import 'bufferutil';
import 'buffer';
import 'utf-8-validate';
import 'http';
import 'https';
import 'typedarray-to-buffer';
import 'yaeti';
import 'cookie-es';
import 'ohash';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

function isNullish (val) {
  return [null, undefined].indexOf(val) !== -1
}

function useData (props, context, dep)
{
  const { object, valueProp, mode } = toRefs(props);

  const $this = getCurrentInstance().proxy;

  // ============ DEPENDENCIES ============

  const iv = dep.iv;

  // =============== METHODS ==============

  const update = (val) => {
    // Setting object(s) as internal value
    iv.value = makeInternal(val);

    // Setting object(s) or plain value as external 
    // value based on `option` setting
    const externalVal = makeExternal(val);

    context.emit('change', externalVal, $this);
    context.emit('input', externalVal);
    context.emit('update:modelValue', externalVal);
  }; 

  // no export
  const makeExternal = (val) => {
    // If external value should be object
    // no transformation is required
    if (object.value) {
      return val
    }

    // No need to transform if empty value
    if (isNullish(val)) {
      return val
    }

    // If external should be plain transform
    // value object to plain values
    return !Array.isArray(val) ? val[valueProp.value] : val.map(v => v[valueProp.value])
  };

  // no export
  const makeInternal = (val) => {
    if (isNullish(val)) {
      return mode.value === 'single' ? {} : []
    }

    return val
  };

  return {
    update,
  }
}

function useValue (props, context)
{
  const { value, modelValue, mode, valueProp } = toRefs(props);

  // ================ DATA ================

  // internalValue
  const iv = ref(mode.value !== 'single' ? [] : {});

  // ============== COMPUTED ==============

  /* istanbul ignore next */
  // externalValue
  const ev = modelValue && modelValue.value !== undefined ? modelValue : value;

  const plainValue = computed(() => {
    return mode.value === 'single' ? iv.value[valueProp.value] : iv.value.map(v=>v[valueProp.value])
  });

  const textValue = computed(() => {
    return mode.value !== 'single' ? iv.value.map(v=>v[valueProp.value]).join(',') : iv.value[valueProp.value]
  });

  return {
    iv,
    internalValue: iv,
    ev,
    externalValue: ev,
    textValue,
    plainValue,
  }
}

function useSearch (props, context, dep)
{  const { regex } = toRefs(props);

  const $this = getCurrentInstance().proxy;

  // ============ DEPENDENCIES ============

  const isOpen = dep.isOpen;
  const open = dep.open;

  // ================ DATA ================

  const search = ref(null);

  const input = ref(null);

  // =============== METHODS ==============

  const clearSearch = () => {
    search.value = '';
  };

  const handleSearchInput = (e) => {
    search.value = e.target.value;
  };

  const handleKeypress = (e) => {
    if (regex && regex.value) {
      let regexp = regex.value;

      if (typeof regexp === 'string') {
        regexp = new RegExp(regexp);
      }

      if (!e.key.match(regexp)) {
        e.preventDefault();
      }
    }
  };

  const handlePaste = (e) => {
    if (regex && regex.value) {
      let clipboardData = e.clipboardData || /* istanbul ignore next */ window.clipboardData;
      let pastedData = clipboardData.getData('Text');

      let regexp = regex.value;

      if (typeof regexp === 'string') {
        regexp = new RegExp(regexp);
      }
      
      if (!pastedData.split('').every(c => !!c.match(regexp))) {
        e.preventDefault();
      }
    }

    context.emit('paste', e, $this);
  };

  // ============== WATCHERS ==============

  watch(search, (val) => {
    if (!isOpen.value && val) {
      open();
    }

    context.emit('search-change', val, $this);
  });

  return {
    search,
    input,
    clearSearch,
    handleSearchInput,
    handleKeypress,
    handlePaste,
  }
}

function usePointer$1 (props, context, dep)
{
  const { groupSelect, mode, groups, disabledProp } = toRefs(props);

  // ================ DATA ================

  const pointer = ref(null);

  // =============== METHODS ==============

  const setPointer = (option) => {
    if (option === undefined || (option !== null && option[disabledProp.value])) {
      return
    }

    if (groups.value && option && option.group && (mode.value === 'single' || !groupSelect.value)) {
      return
    }

    pointer.value = option;
  };

  const clearPointer = () => {
    setPointer(null);
  };

  return {
    pointer,
    setPointer,
    clearPointer,
  }
}

function normalize (str, strict = true) {
  return strict
    ? String(str).toLowerCase().trim()
    : String(str).normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()
}

function isObject (variable) {
  return Object.prototype.toString.call(variable) === '[object Object]'
}

function arraysEqual (array1, array2) {
  const array2Sorted = array2.slice().sort();

  return array1.length === array2.length && array1.slice().sort().every(function(value, index) {
      return value === array2Sorted[index];
  })
}

function useOptions (props, context, dep)
{
  const { 
    options, mode, trackBy: trackBy_, limit, hideSelected, createTag, createOption: createOption_, label,
    appendNewTag, appendNewOption: appendNewOption_, multipleLabel, object, loading, delay, resolveOnLoad,
    minChars, filterResults, clearOnSearch, clearOnSelect, valueProp,
    canDeselect, max, strict, closeOnSelect, groups: groupped, reverse, infinite,
    groupOptions, groupHideEmpty, groupSelect, onCreate, disabledProp, searchStart,
  } = toRefs(props);

  const $this = getCurrentInstance().proxy;

  // ============ DEPENDENCIES ============

  const iv = dep.iv;
  const ev = dep.ev;
  const search = dep.search;
  const clearSearch = dep.clearSearch;
  const update = dep.update;
  const pointer = dep.pointer;
  const clearPointer = dep.clearPointer;
  const focus = dep.focus;
  const deactivate = dep.deactivate;
  const close = dep.close;

  // ================ DATA ================

  // no export
  // appendedOptions
  const ap = ref([]);

  // no export
  // resolvedOptions
  const ro = ref([]);

  const resolving = ref(false);

  // no export
  const searchWatcher = ref(null);

  const offset = ref(infinite.value && limit.value === -1 ? 10 : limit.value);

  // ============== COMPUTED ==============

  // no export
  const createOption = computed(() => {
    return createTag.value || createOption_.value || false
  });

  // no export
  const appendNewOption = computed(() => {
    if (appendNewTag.value !== undefined) {
      return appendNewTag.value
    } else if (appendNewOption_.value !== undefined) {
      return appendNewOption_.value
    }

    return true
  });

  // no export
  // extendedOptions
  const eo = computed(() => {
    if (groupped.value) {
      let groups = ro.value || /* istanbul ignore next */ [];

      let eo = [];

      groups.forEach((group) => {
        optionsToArray(group[groupOptions.value]).forEach((option) => {
          eo.push(Object.assign({}, option, group[disabledProp.value] ? { [disabledProp.value]: true } : {}));
        });
      });

      return eo
    } else {
      let eo = optionsToArray(ro.value || /* istanbul ignore next */ []);

      if (ap.value.length) {
        eo = eo.concat(ap.value);
      }

      return eo
    }
  });

  const fg = computed(() => {
    if (!groupped.value) {
      return []
    }

    return filterGroups((ro.value || /* istanbul ignore next */ []).map((group, index) => {
      const arrayOptions = optionsToArray(group[groupOptions.value]);

      return {
        ...group,
        index,
        group: true,
        [groupOptions.value]: filterOptions(arrayOptions, false).map(o => Object.assign({}, o, group[disabledProp.value] ? { [disabledProp.value]: true } : {})),
        __VISIBLE__: filterOptions(arrayOptions).map(o => Object.assign({}, o, group[disabledProp.value] ? { [disabledProp.value]: true } : {})),
      }
      // Difference between __VISIBLE__ and {groupOptions}: visible does not contain selected options when hideSelected=true
    }))
  });

  // preFilteredOptions
  const pfo = computed(() => {
    let options = eo.value;

    if (reverse.value) {
      options = options.reverse();
    }

    if (createdOption.value.length) {
      options = createdOption.value.concat(options);
    }

    return filterOptions(options)
  });

  // filteredOptions
  const fo = computed(() => {
    let options = pfo.value;

    if (offset.value > 0) {
      options = options.slice(0, offset.value);
    }

    return options
  });

  const hasSelected = computed(() => {
    switch (mode.value) {
      case 'single':
        return !isNullish(iv.value[valueProp.value])

      case 'multiple':
      case 'tags':
        return !isNullish(iv.value) && iv.value.length > 0
    }
  });

  const multipleLabelText = computed(() => {
    return multipleLabel !== undefined && multipleLabel.value !== undefined
      ? multipleLabel.value(iv.value, $this)
      : (iv.value && iv.value.length > 1 ? `${iv.value.length} options selected` : `1 option selected`)
  });

  const noOptions = computed(() => {
    return !eo.value.length && !resolving.value && !createdOption.value.length
  });


  const noResults = computed(() => {
    return eo.value.length > 0 && fo.value.length == 0 && ((search.value && groupped.value) || !groupped.value)
  });

  // no export
  const createdOption = computed(() => {
    if (createOption.value === false || !search.value) {
      return []
    }

    return getOptionByTrackBy(search.value) !== -1 ? [] : [{
      [valueProp.value]: search.value,
      [label.value]: search.value,
      [trackBy.value]: search.value,
      __CREATE__: true,
    }]
  });

  const trackBy = computed(() => {
    return trackBy_.value || label.value
  });

  // no export
  const nullValue = computed(() => {
    switch (mode.value) {
      case 'single':
        return null

      case 'multiple':
      case 'tags':
        return []
    }
  });

  const busy = computed(() => {
    return loading.value || resolving.value
  });

  // =============== METHODS ==============

  /**
   * @param {array|object|string|number} option 
   */
  const select = (option) => {
    if (typeof option !== 'object') {
      option = getOption(option);
    }

    switch (mode.value) {
      case 'single':
        update(option);
        break

      case 'multiple':
      case 'tags':
        update((iv.value).concat(option));
        break
    }

    context.emit('select', finalValue(option), option, $this);
  };

  const deselect = (option) => {
    if (typeof option !== 'object') {
      option = getOption(option);
    }

    switch (mode.value) {
      case 'single':
        clear();
        break

      case 'tags':
      case 'multiple':
        update(Array.isArray(option)
          ? iv.value.filter(v => option.map(o => o[valueProp.value]).indexOf(v[valueProp.value]) === -1)
          : iv.value.filter(v => v[valueProp.value] != option[valueProp.value]));
        break
    }

    context.emit('deselect', finalValue(option), option, $this);
  };

  // no export
  const finalValue = (option) => {
    return object.value ? option : option[valueProp.value]
  };

  const remove = (option) => {
    deselect(option);
  };

  const handleTagRemove = (option, e) => {
    if (e.button !== 0) {
      e.preventDefault();
      return
    }

    remove(option);
  };

  const clear = () => {
    context.emit('clear', $this);
    update(nullValue.value);
  };

  const isSelected = (option) => {
    if (option.group !== undefined) {
      return mode.value === 'single' ? false : areAllSelected(option[groupOptions.value]) && option[groupOptions.value].length
    }

    switch (mode.value) {
      case 'single':
        return !isNullish(iv.value) && iv.value[valueProp.value] == option[valueProp.value]

      case 'tags':
      case 'multiple':
        return !isNullish(iv.value) && iv.value.map(o => o[valueProp.value]).indexOf(option[valueProp.value]) !== -1
    }
  };

  const isDisabled = (option) => {
    return option[disabledProp.value] === true
  };

  const isMax = () => {
    if (max === undefined || max.value === -1 || (!hasSelected.value && max.value > 0)) {
      return false
    }
    
    return iv.value.length >= max.value
  };

  const handleOptionClick = (option) => {
    if (isDisabled(option)) {
      return
    }

    if (onCreate && onCreate.value && !isSelected(option) && option.__CREATE__) {
      option = { ...option };
      delete option.__CREATE__;

      option = onCreate.value(option, $this);
      
      if (option instanceof Promise) {
        resolving.value = true;
        option.then((result) => {
          resolving.value = false;
          handleOptionSelect(result);
        });

        return
      } 
    }

    handleOptionSelect(option);
  };

  const handleOptionSelect = (option) => {
    if (option.__CREATE__) {
      option = { ...option };
      delete option.__CREATE__;
    }
    
    switch (mode.value) {
      case 'single':
        if (option && isSelected(option)) {
          if (canDeselect.value) {
            deselect(option);
          }
          return
        }

        if (option) {
          handleOptionAppend(option);
        }

        /* istanbul ignore else */
        if (clearOnSelect.value) {
          clearSearch();
        }

        if (closeOnSelect.value) {
          clearPointer();
          close();
        }

        if (option) {
          select(option);
        }
        break

      case 'multiple':
        if (option && isSelected(option)) {
          deselect(option);
          return
        }

        if (isMax()) {
          return
        }

        if (option) {
          handleOptionAppend(option);
          select(option);
        }

        if (clearOnSelect.value) {
          clearSearch();
        }

        if (hideSelected.value) {
          clearPointer();
        }

        if (closeOnSelect.value) {
          close();
        }
        break

      case 'tags':
        if (option && isSelected(option)) {
          deselect(option);
          return
        }

        if (isMax()) {
          return
        }

        if (option) {
          handleOptionAppend(option);
        }

        if (clearOnSelect.value) {
          clearSearch();
        }

        if (option) {
          select(option);
        }

        if (hideSelected.value) {
          clearPointer();
        }

        if (closeOnSelect.value) {
          close();
        }
        break
    }

    if (!closeOnSelect.value) {
      focus();
    }
  };

  const handleGroupClick = (group) => {
    if (isDisabled(group) || mode.value === 'single' || !groupSelect.value) {
      return
    }

    switch (mode.value) {
      case 'multiple':
      case 'tags':
        if (areAllEnabledSelected(group[groupOptions.value])) {
          deselect(group[groupOptions.value]);
        } else {
          select(group[groupOptions.value]
            .filter(o => iv.value.map(v => v[valueProp.value]).indexOf(o[valueProp.value]) === -1)
            .filter(o => !o[disabledProp.value])
            .filter((o, k) => iv.value.length + 1 + k <= max.value || max.value === -1)
          );
        }
        break
    }

    if (closeOnSelect.value) {
      deactivate();
    }
  };

  const handleOptionAppend = (option) => {
    if (getOption(option[valueProp.value]) === undefined && createOption.value) {
      context.emit('tag', option[valueProp.value], $this);
      context.emit('option', option[valueProp.value], $this);

      if (appendNewOption.value) {
        appendOption(option);
      }

      clearSearch();
    }
  };

  const selectAll = () => {
    if (mode.value === 'single') {
      return
    }

    select(fo.value);
  };

  // no export
  const areAllEnabledSelected = (options) => {
    return options.find(o => !isSelected(o) && !o[disabledProp.value]) === undefined
  };

  // no export
  const areAllSelected = (options) => {
    return options.find(o => !isSelected(o)) === undefined
  };

  const getOption = (val) => {
    return eo.value[eo.value.map(o => String(o[valueProp.value])).indexOf(String(val))]
  };

  // no export
  const getOptionByTrackBy = (val, norm = true) => {
    return eo.value.map(o => parseInt(o[trackBy.value]) == o[trackBy.value] ? parseInt(o[trackBy.value]) : o[trackBy.value]).indexOf(
      parseInt(val) == val ? parseInt(val) : val
    )
  };

  // no export
  const shouldHideOption = (option) => {
    return ['tags', 'multiple'].indexOf(mode.value) !== -1 && hideSelected.value && isSelected(option)
  };

  // no export
  const appendOption = (option) => {
    ap.value.push(option);
  };

  // no export
  const filterGroups = (groups) => {
    // If the search has value we need to filter among 
    // he ones that are visible to the user to avoid
    // displaying groups which technically have options
    // based on search but that option is already selected.
    return groupHideEmpty.value
      ? groups.filter(g => search.value
          ? g.__VISIBLE__.length
          : g[groupOptions.value].length
        )
      : groups.filter(g => search.value ? g.__VISIBLE__.length : true)
  };

  // no export
  const filterOptions = (options, excludeHideSelected = true) => {
    let fo = options;
    
    if (search.value && filterResults.value) {
      fo = fo.filter((option) => {
        return searchStart.value
          ? normalize(option[trackBy.value], strict.value).startsWith(normalize(search.value, strict.value))
          : normalize(option[trackBy.value], strict.value).indexOf(normalize(search.value, strict.value)) !== -1
      });
    }

    if (hideSelected.value && excludeHideSelected) {
      fo = fo.filter((option) => !shouldHideOption(option));
    }

    return fo
  };

  // no export
  const optionsToArray = (options) => {
    let uo = options;
    
    // Transforming an object to an array of objects
    if (isObject(uo)) {
      uo = Object.keys(uo).map((key) => {
        let val = uo[key];

        return { [valueProp.value]: key, [trackBy.value]: val, [label.value]: val}
      });
    }

    // Transforming an plain arrays to an array of objects
    uo = uo.map((val) => {
      return typeof val === 'object' ? val : { [valueProp.value]: val, [trackBy.value]: val, [label.value]: val}
    });

    return uo
  };

  // no export
  const initInternalValue = () => {
    if (!isNullish(ev.value)) {
      iv.value = makeInternal(ev.value);
    }
  };

  const resolveOptions = (callback) => {
    resolving.value = true;

    return new Promise((resolve, reject) => {
      options.value(search.value, $this).then((response) => {
        ro.value = response || [];

        if (typeof callback == 'function') {
          callback(response);
        }

        resolving.value = false;
      }).catch((e) => {
        console.error(e);

        ro.value = [];

        resolving.value = false;
      }).finally(() => {
        resolve();
      });
    })
  };

  // no export
  const refreshLabels = () => {
    if (!hasSelected.value) {
      return
    }

    if (mode.value === 'single') {
      let option = getOption(iv.value[valueProp.value]);

      /* istanbul ignore else */
      if (option !== undefined) {
        let newLabel = option[label.value];

        iv.value[label.value] = newLabel;

        if (object.value) {
          ev.value[label.value] = newLabel;
        }
      }
    } else {
      iv.value.forEach((val, i) => {
        let option = getOption(iv.value[i][valueProp.value]);

        /* istanbul ignore else */
        if (option !== undefined) {
          let newLabel = option[label.value];

          iv.value[i][label.value] = newLabel;

          if (object.value) {
            ev.value[i][label.value] = newLabel;
          }
        }
      });
    }
  };

  const refreshOptions = (callback) => {
    resolveOptions(callback);
  };

  // no export
  const makeInternal = (val) => {
    if (isNullish(val)) {
      return mode.value === 'single' ? {} : []
    }

    if (object.value) {
      return val
    }

    // If external should be plain transform
    // value object to plain values
    return mode.value === 'single' ? getOption(val) || {} : val.filter(v => !! getOption(v)).map(v => getOption(v))
  };

  // no export
  const initSearchWatcher = () => {
    searchWatcher.value = watch(search, (query) => {
      if (query.length < minChars.value || (!query && minChars.value !== 0)) {
        return
      }

      resolving.value = true;

      if (clearOnSearch.value) {
        ro.value = [];
      }
      setTimeout(() => {
        if (query != search.value) {
          return
        }

        options.value(search.value, $this).then((response) => {
          if (query == search.value || !search.value) {
            ro.value = response;
            pointer.value = fo.value.filter(o => o[disabledProp.value] !== true)[0] || null;
            resolving.value = false;
          }
        }).catch( /* istanbul ignore next */ (e) => {
          console.error(e);
        });
      }, delay.value);

    }, { flush: 'sync' });
  };

  // ================ HOOKS ===============

  if (mode.value !== 'single' && !isNullish(ev.value) && !Array.isArray(ev.value)) {
    throw new Error(`v-model must be an array when using "${mode.value}" mode`)
  }

  if (options && typeof options.value == 'function') {
    if (resolveOnLoad.value) {
      resolveOptions(initInternalValue);
    } else if (object.value == true) {
      initInternalValue();
    }
  }
  else {
    ro.value = options.value;

    initInternalValue();
  }
  
  // ============== WATCHERS ==============

  if (delay.value > -1) {
    initSearchWatcher();
  }

  watch(delay, (value, old) => {
    /* istanbul ignore else */
    if (searchWatcher.value) {
      searchWatcher.value();
    }

    if (value >= 0) {
      initSearchWatcher();
    }
  });

  watch(ev, (newValue) => {
    if (isNullish(newValue)) {
      iv.value = makeInternal(newValue);
      return
    }

    switch (mode.value) {
      case 'single':
        if (object.value ? newValue[valueProp.value] != iv.value[valueProp.value] : newValue != iv.value[valueProp.value]) {
          iv.value = makeInternal(newValue);
        }
        break

      case 'multiple':
      case 'tags':
        if (!arraysEqual(object.value ? newValue.map(o => o[valueProp.value]) : newValue, iv.value.map(o => o[valueProp.value]))) {
          iv.value = makeInternal(newValue);
        }
        break
    }
  }, { deep: true });

  watch(options, (n, o) => {
    if (typeof props.options === 'function') {
      if (resolveOnLoad.value && (!o || (n && n.toString() !== o.toString()))) {
        resolveOptions();
      }
    } else {
      ro.value = props.options;

      if (!Object.keys(iv.value).length) {
        initInternalValue();
      }

      refreshLabels();
    }
  });

  watch(label, refreshLabels);

  return {
    pfo,
    fo,
    filteredOptions: fo,
    hasSelected,
    multipleLabelText,
    eo,
    extendedOptions: eo,
    fg,
    filteredGroups: fg,
    noOptions,
    noResults,
    resolving,
    busy,
    offset,
    select,
    deselect,
    remove,
    selectAll,
    clear,
    isSelected,
    isDisabled,
    isMax,
    getOption,
    handleOptionClick,
    handleGroupClick,
    handleTagRemove,
    refreshOptions,
    resolveOptions,
    refreshLabels,
  }
}

function usePointer (props, context, dep)
{
  const {
    valueProp, showOptions, searchable, groupLabel,
    groups: groupped, mode, groupSelect, disabledProp,
  } = toRefs(props);

  // ============ DEPENDENCIES ============

  const fo = dep.fo;
  const fg = dep.fg;
  const handleOptionClick = dep.handleOptionClick;
  const handleGroupClick = dep.handleGroupClick;
  const search = dep.search;
  const pointer = dep.pointer;
  const setPointer = dep.setPointer;
  const clearPointer = dep.clearPointer;
  const multiselect = dep.multiselect;
  const isOpen = dep.isOpen;

  // ============== COMPUTED ==============

  // no export
  const options = computed(() => {
    return fo.value.filter(o => !o[disabledProp.value])
  });

  const groups = computed(() => {
    return fg.value.filter(o => !o[disabledProp.value])
  });

  const canPointGroups = computed(() => {
    return mode.value !== 'single' && groupSelect.value
  });

  const isPointerGroup = computed(() => {
    return pointer.value && pointer.value.group
  });

  const currentGroup = computed(() => {
    return getParentGroup(pointer.value)
  });

  const prevGroup = computed(() => {
    const group = isPointerGroup.value ? pointer.value : /* istanbul ignore next */ getParentGroup(pointer.value);
    const groupIndex = groups.value.map(g => g[groupLabel.value]).indexOf(group[groupLabel.value]);
    let prevGroup = groups.value[groupIndex - 1];

    if (prevGroup === undefined) {
      prevGroup = lastGroup.value;
    }

    return prevGroup
  });
  
  const nextGroup = computed(() => {
    let nextIndex = groups.value.map(g => g.label).indexOf(isPointerGroup.value
      ? pointer.value[groupLabel.value]
      : getParentGroup(pointer.value)[groupLabel.value]) + 1;

    if (groups.value.length <= nextIndex) {
      nextIndex = 0;
    }

    return groups.value[nextIndex]
  });

  const lastGroup = computed(() => {
    return [...groups.value].slice(-1)[0]
  });
  
  const currentGroupFirstEnabledOption = computed(() => {
    return pointer.value.__VISIBLE__.filter(o => !o[disabledProp.value])[0]
  });

  const currentGroupPrevEnabledOption = computed(() => {
    const options = currentGroup.value.__VISIBLE__.filter(o => !o[disabledProp.value]);
    return options[options.map(o => o[valueProp.value]).indexOf(pointer.value[valueProp.value]) - 1]
  });
  
  const currentGroupNextEnabledOption = computed(() => {
    const options = getParentGroup(pointer.value).__VISIBLE__.filter(o => !o[disabledProp.value]);
    return options[options.map(o => o[valueProp.value]).indexOf(pointer.value[valueProp.value]) + 1]
  });

  const prevGroupLastEnabledOption = computed(() => {
    return [...prevGroup.value.__VISIBLE__.filter(o => !o[disabledProp.value])].slice(-1)[0]
  });

  const lastGroupLastEnabledOption = computed(() => {
    return [...lastGroup.value.__VISIBLE__.filter(o => !o[disabledProp.value])].slice(-1)[0]
  });

  // =============== METHODS ==============

  const isPointed = (option) => {
    return (!!pointer.value && (
      (!option.group && pointer.value[valueProp.value] == option[valueProp.value]) ||
      (option.group !== undefined && pointer.value[groupLabel.value] == option[groupLabel.value])
    )) ? true : undefined
  };

  const setPointerFirst = () => {
    setPointer(options.value[0] || null);
  };

  const selectPointer = () => {
    if (!pointer.value || pointer.value[disabledProp.value] === true) {
      return
    }

    if (isPointerGroup.value) {
      handleGroupClick(pointer.value);
    } else {
      handleOptionClick(pointer.value);
    }
  };

  const forwardPointer = () => {
    if (pointer.value === null) {
      setPointer((groupped.value && canPointGroups.value ? groups.value[0] : options.value[0]) || null);
    }
    else if (groupped.value && canPointGroups.value) {
      let nextPointer = isPointerGroup.value ? currentGroupFirstEnabledOption.value : currentGroupNextEnabledOption.value;

      if (nextPointer === undefined) {
        nextPointer = nextGroup.value;
      }

      setPointer(nextPointer || /* istanbul ignore next */ null);
    } else {
      let next = options.value.map(o => o[valueProp.value]).indexOf(pointer.value[valueProp.value]) + 1;

      if (options.value.length <= next) {
        next = 0;
      }

      setPointer(options.value[next] || null);
    }

    nextTick(() => {
      adjustWrapperScrollToPointer();
    });
  };

  const backwardPointer = () => {
    if (pointer.value === null) {
      let prevPointer = options.value[options.value.length - 1];

      if (groupped.value && canPointGroups.value) {
        prevPointer = lastGroupLastEnabledOption.value;

        if (prevPointer === undefined) {
          prevPointer = lastGroup.value;
        }
      }

      setPointer(prevPointer  || null);
    }
    else if (groupped.value && canPointGroups.value) {
      let prevPointer = isPointerGroup.value ? prevGroupLastEnabledOption.value : currentGroupPrevEnabledOption.value;

      if (prevPointer === undefined) {
        prevPointer = isPointerGroup.value ? prevGroup.value : currentGroup.value;
      }

      setPointer(prevPointer || /* istanbul ignore next */ null);
    } else {
      let prevIndex = options.value.map(o => o[valueProp.value]).indexOf(pointer.value[valueProp.value]) - 1;

      if (prevIndex < 0) {
        prevIndex = options.value.length - 1;
      }

      setPointer(options.value[prevIndex] || null);
    }

    nextTick(() => {
      adjustWrapperScrollToPointer();
    });
  };

  const getParentGroup = (option) => {
    return groups.value.find((group) => {
      return group.__VISIBLE__.map(o => o[valueProp.value]).indexOf(option[valueProp.value]) !== -1
    })
  };

  // no export
  /* istanbul ignore next */
  const adjustWrapperScrollToPointer = () => {
    let pointedOption = multiselect.value.querySelector(`[data-pointed]`);

    if (!pointedOption) {
      return
    }

    let wrapper = pointedOption.parentElement.parentElement;

    if (groupped.value) {
      wrapper = isPointerGroup.value
        ? pointedOption.parentElement.parentElement.parentElement
        : pointedOption.parentElement.parentElement.parentElement.parentElement;
    }

    if (pointedOption.offsetTop + pointedOption.offsetHeight > wrapper.clientHeight + wrapper.scrollTop) {
      wrapper.scrollTop = pointedOption.offsetTop + pointedOption.offsetHeight - wrapper.clientHeight;
    }
    
    if (pointedOption.offsetTop < wrapper.scrollTop) {
      wrapper.scrollTop = pointedOption.offsetTop;
    }
  };

  // ============== WATCHERS ==============

  watch(search, (val) => {
    if (searchable.value) {
      if (val.length && showOptions.value) {
        setPointerFirst();
      } else {
        clearPointer();
      }
    }
  });

  watch(isOpen, (val) => {
    if (val) {
      let firstSelected = multiselect.value.querySelectorAll(`[data-selected]`)[0];

      if (!firstSelected) {
        return
      }

      let wrapper = firstSelected.parentElement.parentElement;
      
      nextTick(() => {
        /* istanbul ignore next */
        if (wrapper.scrollTop > 0) {
          return
        }

        wrapper.scrollTop = firstSelected.offsetTop;
      });
    }
  });

  return {
    pointer,
    canPointGroups,
    isPointed,
    setPointerFirst,
    selectPointer,
    forwardPointer,
    backwardPointer,
  }
}

function useDropdown (props, context, dep)
{
  const { disabled } = toRefs(props);

  const $this = getCurrentInstance().proxy;

  // ================ DATA ================

  const isOpen = ref(false);

  // =============== METHODS ==============

  const open = () => {
    if (isOpen.value || disabled.value) {
      return
    }

    isOpen.value = true;
    context.emit('open', $this);
  };

  const close = () => {
    if (!isOpen.value) {
      return
    }

    isOpen.value = false;
    context.emit('close', $this);
  };

  return {
    isOpen,
    open,
    close,
  }
}

function useMultiselect (props, context, dep)
{
  const { searchable, disabled } = toRefs(props);

  // ============ DEPENDENCIES ============

  const input = dep.input;
  const open = dep.open;
  const close = dep.close;
  const clearSearch = dep.clearSearch;
  const isOpen = dep.isOpen;

  // ================ DATA ================

  const multiselect = ref(null);

  const tags = ref(null);

  const isActive = ref(false);

  const mouseClicked = ref(false);

  // ============== COMPUTED ==============

  const tabindex = computed(() => {
    return searchable.value || disabled.value ? -1 : 0
  });

  // =============== METHODS ==============

  const blur = () => {
    if (searchable.value) {
      input.value.blur();
    }

    multiselect.value.blur();
  };

  const focus = () => {
    if (searchable.value && !disabled.value) {
      input.value.focus();
    }
  };

  const activate = (shouldOpen = true) => {
    if (disabled.value) {
      return
    }

    isActive.value = true;

    if (shouldOpen) {
      open();
    }
  };

  const deactivate = () => {
    isActive.value = false;

    setTimeout(() => {
      if (!isActive.value) {
        close();
        clearSearch();
      }
    }, 1);
  };

  const handleFocusIn = () => {
    activate(mouseClicked.value);
  };

  const handleFocusOut = () => {
    deactivate();
  };

  const handleCaretClick = () => {
    deactivate();
    blur();
  };

  /* istanbul ignore next */
  const handleMousedown = (e) => {
    mouseClicked.value = true;

    if (isOpen.value && (e.target.isEqualNode(multiselect.value) || e.target.isEqualNode(tags.value))) {
      setTimeout(() => {
        deactivate();
      }, 0);
    } else if (document.activeElement.isEqualNode(multiselect.value) && !isOpen.value) {
      activate();    
    }

    setTimeout(() => {
      mouseClicked.value = false;
    }, 0);
  };

  return {
    multiselect,
    tags,
    tabindex,
    isActive,
    mouseClicked,
    blur,
    focus,
    activate,
    deactivate,
    handleFocusIn,
    handleFocusOut,
    handleCaretClick,
    handleMousedown,
  }
}

function useKeyboard (props, context, dep)
{
  const {
    mode, addTagOn, openDirection, searchable,
    showOptions, valueProp, groups: groupped,
    addOptionOn: addOptionOn_, createTag, createOption: createOption_,
    reverse,
  } = toRefs(props);

  const $this = getCurrentInstance().proxy;

  // ============ DEPENDENCIES ============

  const iv = dep.iv;
  const update = dep.update;
  const search = dep.search;
  const setPointer = dep.setPointer;
  const selectPointer = dep.selectPointer;
  const backwardPointer = dep.backwardPointer;
  const forwardPointer = dep.forwardPointer;
  const multiselect = dep.multiselect;
  const tags = dep.tags;
  const isOpen = dep.isOpen;
  const open = dep.open;
  const blur = dep.blur;
  const fo = dep.fo;

  // ============== COMPUTED ==============

  // no export
  const createOption = computed(() => {
    return createTag.value || createOption_.value || false
  });

  // no export
  const addOptionOn = computed(() => {
    if (addTagOn.value !== undefined) {
      return addTagOn.value
    }
    else if (addOptionOn_.value !== undefined) {
      return addOptionOn_.value
    }

    return ['enter']
  });

  // =============== METHODS ==============

  // no export
  const preparePointer = () => {
    // When options are hidden and creating tags is allowed
    // no pointer will be set (because options are hidden).
    // In such case we need to set the pointer manually to the 
    // first option, which equals to the option created from
    // the search value.
    if (mode.value === 'tags' && !showOptions.value && createOption.value && searchable.value && !groupped.value) {
      setPointer(fo.value[fo.value.map(o => o[valueProp.value]).indexOf(search.value)]);
    }
  };

  const handleKeydown = (e) => {
    context.emit('keydown', e, $this);

    let tagList;
    let activeIndex;

    if (['ArrowLeft', 'ArrowRight', 'Enter'].indexOf(e.key) !== -1 && mode.value === 'tags') {
      tagList = [...(multiselect.value.querySelectorAll(`[data-tags] > *`))].filter(e => e !== tags.value);
      activeIndex = tagList.findIndex(e => e === document.activeElement);
    }

    switch (e.key) {
      case 'Backspace':
        if (mode.value === 'single') {
          return
        }

        if (searchable.value && [null, ''].indexOf(search.value) === -1) {
          return
        }

        if (iv.value.length === 0) {
          return
        }
        
        update([...iv.value].slice(0,-1));
        break

      case 'Enter':
        e.preventDefault();

        if (activeIndex !== -1 && activeIndex !== undefined) {
          update([...iv.value].filter((v, k) => k !== activeIndex));

          if (activeIndex === tagList.length - 1) {
            if (tagList.length - 1) {
              tagList[tagList.length - 2].focus();
            } else if (searchable.value) {
              tags.value.querySelector('input').focus();
            } else {
              multiselect.value.focus();
            }
          }
          return
        }

        if (addOptionOn.value.indexOf('enter') === -1 && createOption.value) {
          return
        }
        
        preparePointer();
        selectPointer();
        break

      case ' ':
        if (!createOption.value && !searchable.value) {
          e.preventDefault();
          
          preparePointer();
          selectPointer();
          return
        }

        if (!createOption.value) {
          return false
        } 

        if (addOptionOn.value.indexOf('space') === -1 && createOption.value) {
          return
        }

        e.preventDefault();
        
        preparePointer();
        selectPointer();
        break
      
      case 'Tab':
      case ';':
      case ',':
        if (addOptionOn.value.indexOf(e.key.toLowerCase()) === -1 || !createOption.value) {
          return
        }

        preparePointer();
        selectPointer();
        e.preventDefault();
        break

      case 'Escape':
        blur();
        break

      case 'ArrowUp':
        e.preventDefault();

        if (!showOptions.value) {
          return
        }

        /* istanbul ignore else */
        if (!isOpen.value) {
          open();
        }
        
        backwardPointer();
        break

      case 'ArrowDown':
        e.preventDefault();

        if (!showOptions.value) {
          return
        }

        /* istanbul ignore else */
        if (!isOpen.value) {
          open();
        }

        forwardPointer();
        break

      case 'ArrowLeft':
        if ((searchable.value && tags.value.querySelector('input').selectionStart) || e.shiftKey || mode.value !== 'tags' || !iv.value || !iv.value.length) {
          return
        }

        e.preventDefault();

        if (activeIndex === -1) {
          tagList[tagList.length-1].focus();
        }
        else if (activeIndex > 0) {
          tagList[activeIndex-1].focus();
        }
        break

      case 'ArrowRight':
        if (activeIndex === -1 || e.shiftKey || mode.value !== 'tags' || !iv.value || !iv.value.length) {
          return
        }

        e.preventDefault();
        
        /* istanbul ignore else */
        if (tagList.length > activeIndex + 1) {
          tagList[activeIndex+1].focus();
        }
        else if (searchable.value) {
          tags.value.querySelector('input').focus();
        }
        else if (!searchable.value) {
          multiselect.value.focus();
        }
        
        break
    }
  };

  const handleKeyup = (e) => {
    context.emit('keyup', e, $this);
  };

  return {
    handleKeydown,
    handleKeyup,
    preparePointer,
  }
}

function useClasses (props, context, dependencies)
{const { 
    classes: classes_, disabled, openDirection, showOptions
  } = toRefs(props);

  // ============ DEPENDENCIES ============

  const isOpen = dependencies.isOpen;
  const isPointed = dependencies.isPointed;
  const isSelected = dependencies.isSelected;
  const isDisabled = dependencies.isDisabled;
  const isActive = dependencies.isActive;
  const canPointGroups = dependencies.canPointGroups;
  const resolving = dependencies.resolving;
  const fo = dependencies.fo;

  const classes = computed(() => ({
    container: 'multiselect',
    containerDisabled: 'is-disabled',
    containerOpen: 'is-open',
    containerOpenTop: 'is-open-top',
    containerActive: 'is-active',
    singleLabel: 'multiselect-single-label',
    singleLabelText: 'multiselect-single-label-text',
    multipleLabel: 'multiselect-multiple-label',
    search: 'multiselect-search',
    tags: 'multiselect-tags',
    tag: 'multiselect-tag',
    tagDisabled: 'is-disabled',
    tagRemove: 'multiselect-tag-remove',
    tagRemoveIcon: 'multiselect-tag-remove-icon',
    tagsSearchWrapper: 'multiselect-tags-search-wrapper',
    tagsSearch: 'multiselect-tags-search',
    tagsSearchCopy: 'multiselect-tags-search-copy',
    placeholder: 'multiselect-placeholder',
    caret: 'multiselect-caret',
    caretOpen: 'is-open',
    clear: 'multiselect-clear',
    clearIcon: 'multiselect-clear-icon',
    spinner: 'multiselect-spinner',
    inifinite: 'multiselect-inifite',
    inifiniteSpinner: 'multiselect-inifite-spinner',
    dropdown: 'multiselect-dropdown',
    dropdownTop: 'is-top',
    dropdownHidden: 'is-hidden',
    options: 'multiselect-options',
    optionsTop: 'is-top',
    group: 'multiselect-group',
    groupLabel: 'multiselect-group-label',
    groupLabelPointable: 'is-pointable',
    groupLabelPointed: 'is-pointed',
    groupLabelSelected: 'is-selected',
    groupLabelDisabled: 'is-disabled',
    groupLabelSelectedPointed: 'is-selected is-pointed',
    groupLabelSelectedDisabled: 'is-selected is-disabled',
    groupOptions: 'multiselect-group-options',
    option: 'multiselect-option',
    optionPointed: 'is-pointed',
    optionSelected: 'is-selected',
    optionDisabled: 'is-disabled',
    optionSelectedPointed: 'is-selected is-pointed',
    optionSelectedDisabled: 'is-selected is-disabled',
    noOptions: 'multiselect-no-options',
    noResults: 'multiselect-no-results',
    fakeInput: 'multiselect-fake-input',
    spacer: 'multiselect-spacer',
    ...classes_.value,
  }));

  // ============== COMPUTED ==============

  const showDropdown = computed(() => {
    return !!(isOpen.value && showOptions.value && (!resolving.value || (resolving.value && fo.value.length)))
  });

  const classList = computed(() => {
    const c = classes.value;

    return {
      container: [c.container]
        .concat(disabled.value ? c.containerDisabled : [])
        .concat(showDropdown.value && openDirection.value === 'top'  ? c.containerOpenTop : [])
        .concat(showDropdown.value && openDirection.value !== 'top' ? c.containerOpen : [])
        .concat(isActive.value ? c.containerActive : []),
      spacer: c.spacer,
      singleLabel: c.singleLabel,
      singleLabelText: c.singleLabelText,
      multipleLabel: c.multipleLabel,
      search: c.search,
      tags: c.tags,
      tag: [c.tag]
        .concat(disabled.value ? c.tagDisabled : []),
      tagRemove: c.tagRemove,
      tagRemoveIcon: c.tagRemoveIcon,
      tagsSearchWrapper: c.tagsSearchWrapper,
      tagsSearch: c.tagsSearch,
      tagsSearchCopy: c.tagsSearchCopy,
      placeholder: c.placeholder,
      caret: [c.caret]
        .concat(isOpen.value ? c.caretOpen : []),
      clear: c.clear,
      clearIcon: c.clearIcon,
      spinner: c.spinner,
      inifinite: c.inifinite,
      inifiniteSpinner: c.inifiniteSpinner,
      dropdown: [c.dropdown]
        .concat(openDirection.value === 'top' ? c.dropdownTop : [])
        .concat(!isOpen.value || !showOptions.value || !showDropdown.value ? c.dropdownHidden : []),
      options: [c.options]
        .concat(openDirection.value === 'top' ? c.optionsTop : []),
      group: c.group,
      groupLabel: (g) => {
        let groupLabel = [c.groupLabel];

        if (isPointed(g)) {
          groupLabel.push(isSelected(g) ? c.groupLabelSelectedPointed : c.groupLabelPointed);
        } else if (isSelected(g) && canPointGroups.value) {
          groupLabel.push(isDisabled(g) ? c.groupLabelSelectedDisabled : c.groupLabelSelected);
        } else if (isDisabled(g)) {
          groupLabel.push(c.groupLabelDisabled);
        }

        if (canPointGroups.value) {
          groupLabel.push(c.groupLabelPointable);
        }

        return groupLabel
      },
      groupOptions: c.groupOptions,
      option: (o, g) => {
        let option = [c.option];

        if (isPointed(o)) {
          option.push(isSelected(o) ? c.optionSelectedPointed : c.optionPointed);
        } else if (isSelected(o)) {
          option.push(isDisabled(o) ? c.optionSelectedDisabled : c.optionSelected);
        } else if (isDisabled(o) || (g && isDisabled(g))) {
          option.push(c.optionDisabled);
        }

        return option
      },
      noOptions: c.noOptions,
      noResults: c.noResults,
      fakeInput: c.fakeInput,
    }
  });

  return {
    classList,
    showDropdown,
  }
}

function useScroll$1 (props, context, dep)
{
  const {
    limit, infinite,
  } = toRefs(props);

  // ============ DEPENDENCIES ============

  const isOpen = dep.isOpen;
  const offset = dep.offset;
  const search = dep.search;
  const pfo = dep.pfo;
  const eo = dep.eo;

  // ================ DATA ================

  // no export
  const observer = ref(null);

  const infiniteLoader = ref(null);

  // ============== COMPUTED ==============

  const hasMore = computed(() => {
    return offset.value < pfo.value.length
  });

  // =============== METHODS ==============

  // no export
  /* istanbul ignore next */
  const handleIntersectionObserver = (entries) => {
    const { isIntersecting, target } = entries[0];

    if (isIntersecting) {
      const parent = target.offsetParent;
      const scrollTop = parent.scrollTop;

      offset.value += limit.value == -1 ? 10 : limit.value;

      nextTick(() => {
        parent.scrollTop = scrollTop;
      });
    }
  };

  const observe = () => {
    /* istanbul ignore else */
    if (isOpen.value && offset.value < pfo.value.length) {
      observer.value.observe(infiniteLoader.value);
    } else if (!isOpen.value && observer.value) {
      observer.value.disconnect();
    }
  };

  // ============== WATCHERS ==============

  watch(isOpen, () => {
    if (!infinite.value) {
      return
    }

    observe();
  });

  watch(search, () => {
    if (!infinite.value) {
      return
    }

    offset.value = limit.value;

    observe();
  }, { flush: 'post' });

  watch(eo, () => {
    if (!infinite.value) {
      return
    }

    observe();
  }, { immediate: false, flush: 'post' });

  // ================ HOOKS ===============

  onMounted(() => {
    /* istanbul ignore else */
    if (window && window.IntersectionObserver) {
      observer.value = new IntersectionObserver(handleIntersectionObserver);
    }
  });

  return {
    hasMore,
    infiniteLoader,
  }
}

function useScroll (props, context, dep)
{
  const { placeholder, id, valueProp, label: labelProp, mode, groupLabel } = toRefs(props);

  // ============ DEPENDENCIES ============

  const pointer = dep.pointer;
  dep.iv;
  dep.hasSelected;
  dep.multipleLabelText;
  dep.isOpen;

  // ================ DATA ================

  const label = ref(null);

  // ============== COMPUTED ==============

  const ariaOwns = computed(() => {
    let texts = [];

    if (id && id.value) {
      texts.push(id.value);
    }

    texts.push('multiselect-options');

    return texts.join('-')
  });

  const ariaActiveDescendant = computed(() => {
    let texts = [];

    if (id && id.value) {
      texts.push(id.value);
    }

    if (pointer.value) {
      texts.push(pointer.value.group ? 'multiselect-group' : 'multiselect-option');

      texts.push(pointer.value.group ? pointer.value.index : pointer.value[valueProp.value]);

      return texts.join('-')
    }
  });



  const ariaPlaceholder = computed(() => {
    return placeholder.value
  });

  const ariaMultiselectable = computed(() => {
    return mode.value !== 'single'
  });

  // =============== METHODS ==============

  const ariaOptionId = (option) => {
    let texts = [];

    if (id && id.value) {
      texts.push(id.value);
    }

    texts.push('multiselect-option');

    texts.push(option[valueProp.value]);

    return texts.join('-')
  };

  const ariaGroupId = (option) => {
    let texts = [];

    if (id && id.value) {
      texts.push(id.value);
    }

    texts.push('multiselect-group');

    texts.push(option.index);

    return texts.join('-')
  };

  const ariaOptionLabel = (option) => {
    let texts = [];

    texts.push(option[labelProp.value]);

    return texts.join(' ')
  };

  const ariaGroupLabel = (group) => {
    let texts = [];

    texts.push(group[groupLabel.value]);

    return texts.join(' ')
  };

  const ariaTagLabel = (label) => {
    return `${label} ❎`
  };

  // =============== HOOKS ================

  onMounted(() => {
    /* istanbul ignore next */
    if (id && id.value && document && document.querySelector) {
      let forTag = document.querySelector(`[for="${id.value}"]`);
      label.value = forTag ? forTag.innerText : null;
    }
  });

  return {
    ariaOwns,
    ariaPlaceholder,
    ariaMultiselectable,
    ariaActiveDescendant,
    ariaOptionId,
    ariaOptionLabel,
    ariaGroupId,
    ariaGroupLabel,
    ariaTagLabel,
  }
}

function resolveDeps (props, context, features, deps = {}) {
  features.forEach((composable) => {
    /* istanbul ignore else */
    if (composable) {
      deps = {
        ...deps,
        ...composable(props, context, deps)
      };
    }

  });
  
  return deps
}

var script = {
    name: 'Multiselect',
    emits: [
      'paste', 'open', 'close', 'select', 'deselect', 
      'input', 'search-change', 'tag', 'option', 'update:modelValue',
      'change', 'clear', 'keydown', 'keyup',
    ],
    props: {
      value: {
        required: false,
      },
      modelValue: {
        required: false,
      },
      options: {
        type: [Array, Object, Function],
        required: false,
        default: () => ([])
      },
      id: {
        type: [String, Number],
        required: false,
      },
      name: {
        type: [String, Number],
        required: false,
        default: 'multiselect',
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      label: {
        type: String,
        required: false,
        default: 'label',
      },
      trackBy: {
        type: String,
        required: false,
        default: undefined,
      },
      valueProp: {
        type: String,
        required: false,
        default: 'value',
      },
      placeholder: {
        type: String,
        required: false,
        default: null,
      },
      mode: {
        type: String,
        required: false,
        default: 'single', // single|multiple|tags
      },
      searchable: {
        type: Boolean,
        required: false,
        default: false,
      },
      limit: {
        type: Number,
        required: false,
        default: -1,
      },
      hideSelected: {
        type: Boolean,
        required: false,
        default: true,
      },
      createTag: {
        type: Boolean,
        required: false,
        default: undefined,
      },
      createOption: {
        type: Boolean,
        required: false,
        default: undefined,
      },
      appendNewTag: {
        type: Boolean,
        required: false,
        default: undefined,
      },
      appendNewOption: {
        type: Boolean,
        required: false,
        default: undefined,
      },
      addTagOn: {
        type: Array,
        required: false,
        default: undefined,
      },
      addOptionOn: {
        type: Array,
        required: false,
        default: undefined,
      },
      caret: {
        type: Boolean,
        required: false,
        default: true,
      },
      loading: {
        type: Boolean,
        required: false,
        default: false,
      },
      noOptionsText: {
        type: String,
        required: false,
        default: 'The list is empty',
      },
      noResultsText: {
        type: String,
        required: false,
        default: 'No results found',
      },
      multipleLabel: {
        type: Function,
        required: false,
      },
      object: {
        type: Boolean,
        required: false,
        default: false,
      },
      delay: {
        type: Number,
        required: false,
        default: -1,
      },
      minChars: {
        type: Number,
        required: false,
        default: 0,
      },
      resolveOnLoad: {
        type: Boolean,
        required: false,
        default: true,
      },
      filterResults: {
        type: Boolean,
        required: false,
        default: true,
      },
      clearOnSearch: {
        type: Boolean,
        required: false,
        default: false,
      },
      clearOnSelect: {
        type: Boolean,
        required: false,
        default: true,
      },
      canDeselect: {
        type: Boolean,
        required: false,
        default: true,
      },
      canClear: {
        type: Boolean,
        required: false,
        default: true,
      },
      max: {
        type: Number,
        required: false,
        default: -1,
      },
      showOptions: {
        type: Boolean,
        required: false,
        default: true,
      },
      required: {
        type: Boolean,
        required: false,
        default: false,
      },
      openDirection: {
        type: String,
        required: false,
        default: 'bottom',
      },
      nativeSupport: {
        type: Boolean,
        required: false,
        default: false,
      },
      classes: {
        type: Object,
        required: false,
        default: () => ({})
      },
      strict: {
        type: Boolean,
        required: false,
        default: true,
      },
      closeOnSelect: {
        type: Boolean,
        required: false,
        default: true,
      },
      autocomplete: {
        type: String,
        required: false,
      },
      groups: {
        type: Boolean,
        required: false,
        default: false,
      },
      groupLabel: {
        type: String,
        required: false,
        default: 'label',
      },
      groupOptions: {
        type: String,
        required: false,
        default: 'options',
      },
      groupHideEmpty: {
        type: Boolean,
        required: false,
        default: false,
      },
      groupSelect: {
        type: Boolean,
        required: false,
        default: true,
      },
      inputType: {
        type: String,
        required: false,
        default: 'text',
      },
      attrs: {
        required: false,
        type: Object,
        default: () => ({}),
      },
      onCreate: {
        required: false,
        type: Function,
      },
      disabledProp: {
        type: String,
        required: false,
        default: 'disabled',
      },
      searchStart: {
        type: Boolean,
        required: false,
        default: false,
      },
      reverse: {
        type: Boolean,
        required: false,
        default: false,
      },
      regex: {
        type: [Object, String, RegExp],
        required: false,
        default: undefined,
      },
      rtl: {
        type: Boolean,
        required: false,
        default: false,
      },
      infinite: {
        type: Boolean,
        required: false,
        default: false,
      },
      aria: {
        required: false,
        type: Object,
        default: () => ({}),
      },
    },
    setup(props, context)
    { 
      return resolveDeps(props, context, [
        useValue,
        usePointer$1,
        useDropdown,
        useSearch,
        useData,
        useMultiselect,
        useOptions,
        useScroll$1,
        usePointer,
        useKeyboard,
        useClasses,
        useScroll,
      ])
    }
  };

const _hoisted_1 = ["tabindex", "id", "dir", "aria-owns", "aria-placeholder", "aria-expanded", "aria-activedescendant", "aria-multiselectable", "role"];
const _hoisted_2 = ["type", "modelValue", "value", "autocomplete", "id", "aria-owns", "aria-placeholder", "aria-expanded", "aria-activedescendant", "aria-multiselectable"];
const _hoisted_3 = ["onKeyup", "aria-label"];
const _hoisted_4 = ["onClick"];
const _hoisted_5 = ["type", "modelValue", "value", "id", "autocomplete", "aria-owns", "aria-placeholder", "aria-expanded", "aria-activedescendant", "aria-multiselectable"];
const _hoisted_6 = ["innerHTML"];
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = ["id"];
const _hoisted_9 = ["id", "aria-label", "aria-selected"];
const _hoisted_10 = ["data-pointed", "onMouseenter", "onClick"];
const _hoisted_11 = ["innerHTML"];
const _hoisted_12 = ["aria-label"];
const _hoisted_13 = ["data-pointed", "data-selected", "onMouseenter", "onClick", "id", "aria-selected", "aria-label"];
const _hoisted_14 = ["innerHTML"];
const _hoisted_15 = ["data-pointed", "data-selected", "onMouseenter", "onClick", "id", "aria-selected", "aria-label"];
const _hoisted_16 = ["innerHTML"];
const _hoisted_17 = ["innerHTML"];
const _hoisted_18 = ["innerHTML"];
const _hoisted_19 = ["value"];
const _hoisted_20 = ["name", "value"];
const _hoisted_21 = ["name", "value"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({
    ref: "multiselect",
    tabindex: _ctx.tabindex,
    class: _ctx.classList.container,
    id: $props.searchable ? undefined : $props.id,
    dir: $props.rtl ? 'rtl' : undefined,
    onFocusin: _cache[9] || (_cache[9] = (...args) => (_ctx.handleFocusIn && _ctx.handleFocusIn(...args))),
    onFocusout: _cache[10] || (_cache[10] = (...args) => (_ctx.handleFocusOut && _ctx.handleFocusOut(...args))),
    onKeydown: _cache[11] || (_cache[11] = (...args) => (_ctx.handleKeydown && _ctx.handleKeydown(...args))),
    onKeyup: _cache[12] || (_cache[12] = (...args) => (_ctx.handleKeyup && _ctx.handleKeyup(...args))),
    onMousedown: _cache[13] || (_cache[13] = (...args) => (_ctx.handleMousedown && _ctx.handleMousedown(...args))),
    "aria-owns": !$props.searchable ? _ctx.ariaOwns : undefined,
    "aria-placeholder": !$props.searchable ? _ctx.ariaPlaceholder : undefined,
    "aria-expanded": !$props.searchable ? _ctx.isOpen : undefined,
    "aria-activedescendant": !$props.searchable ? _ctx.ariaActiveDescendant : undefined,
    "aria-multiselectable": !$props.searchable ? _ctx.ariaMultiselectable : undefined,
    role: !$props.searchable ? 'listbox' : undefined
  }, !$props.searchable ? $props.aria : {}), [
    createCommentVNode(" Search "),
    ($props.mode !== 'tags' && $props.searchable && !$props.disabled)
      ? (openBlock(), createElementBlock("input", mergeProps({
          key: 0,
          type: $props.inputType,
          modelValue: _ctx.search,
          value: _ctx.search,
          class: _ctx.classList.search,
          autocomplete: $props.autocomplete,
          id: $props.searchable ? $props.id : undefined,
          onInput: _cache[0] || (_cache[0] = (...args) => (_ctx.handleSearchInput && _ctx.handleSearchInput(...args))),
          onKeypress: _cache[1] || (_cache[1] = (...args) => (_ctx.handleKeypress && _ctx.handleKeypress(...args))),
          onPaste: _cache[2] || (_cache[2] = withModifiers((...args) => (_ctx.handlePaste && _ctx.handlePaste(...args)), ["stop"])),
          ref: "input",
          "aria-owns": _ctx.ariaOwns,
          "aria-placeholder": _ctx.ariaPlaceholder,
          "aria-expanded": _ctx.isOpen,
          "aria-activedescendant": _ctx.ariaActiveDescendant,
          "aria-multiselectable": _ctx.ariaMultiselectable,
          role: "listbox"
        }, {
          ...$props.attrs,
          ...$props.aria,
        }), null, 16 /* FULL_PROPS */, _hoisted_2))
      : createCommentVNode("v-if", true),
    createCommentVNode(" Tags (with search) "),
    ($props.mode == 'tags')
      ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(_ctx.classList.tags),
          "data-tags": ""
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.iv, (option, i, key) => {
            return renderSlot(_ctx.$slots, "tag", {
              option: option,
              handleTagRemove: _ctx.handleTagRemove,
              disabled: $props.disabled
            }, () => [
              (openBlock(), createElementBlock("span", {
                class: normalizeClass(_ctx.classList.tag),
                tabindex: "-1",
                onKeyup: withKeys($event => (_ctx.handleTagRemove(option, $event)), ["enter"]),
                key: key,
                "aria-label": _ctx.ariaTagLabel(option[$props.label])
              }, [
                createTextVNode(toDisplayString(option[$props.label]) + " ", 1 /* TEXT */),
                (!$props.disabled)
                  ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: normalizeClass(_ctx.classList.tagRemove),
                      onClick: $event => (_ctx.handleTagRemove(option, $event))
                    }, [
                      createElementVNode("span", {
                        class: normalizeClass(_ctx.classList.tagRemoveIcon)
                      }, null, 2 /* CLASS */)
                    ], 10 /* CLASS, PROPS */, _hoisted_4))
                  : createCommentVNode("v-if", true)
              ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_3))
            ])
          }), 256 /* UNKEYED_FRAGMENT */)),
          createElementVNode("div", {
            class: normalizeClass(_ctx.classList.tagsSearchWrapper),
            ref: "tags"
          }, [
            createCommentVNode(" Used for measuring search width "),
            createElementVNode("span", {
              class: normalizeClass(_ctx.classList.tagsSearchCopy)
            }, toDisplayString(_ctx.search), 3 /* TEXT, CLASS */),
            createCommentVNode(" Actual search input "),
            ($props.searchable && !$props.disabled)
              ? (openBlock(), createElementBlock("input", mergeProps({
                  key: 0,
                  type: $props.inputType,
                  modelValue: _ctx.search,
                  value: _ctx.search,
                  class: _ctx.classList.tagsSearch,
                  id: $props.searchable ? $props.id : undefined,
                  autocomplete: $props.autocomplete,
                  onInput: _cache[3] || (_cache[3] = (...args) => (_ctx.handleSearchInput && _ctx.handleSearchInput(...args))),
                  onKeypress: _cache[4] || (_cache[4] = (...args) => (_ctx.handleKeypress && _ctx.handleKeypress(...args))),
                  onPaste: _cache[5] || (_cache[5] = withModifiers((...args) => (_ctx.handlePaste && _ctx.handlePaste(...args)), ["stop"])),
                  ref: "input",
                  "aria-owns": _ctx.ariaOwns,
                  "aria-placeholder": _ctx.ariaPlaceholder,
                  "aria-expanded": _ctx.isOpen,
                  "aria-activedescendant": _ctx.ariaActiveDescendant,
                  "aria-multiselectable": _ctx.ariaMultiselectable,
                  role: "listbox"
                }, {
              ...$props.attrs,
              ...$props.aria,
            }), null, 16 /* FULL_PROPS */, _hoisted_5))
              : createCommentVNode("v-if", true)
          ], 2 /* CLASS */)
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    createCommentVNode(" Single label "),
    ($props.mode == 'single' && _ctx.hasSelected && !_ctx.search && _ctx.iv)
      ? renderSlot(_ctx.$slots, "singlelabel", {
          key: 2,
          value: _ctx.iv
        }, () => [
          createElementVNode("div", {
            class: normalizeClass(_ctx.classList.singleLabel),
            "aria-hidden": "true"
          }, [
            createElementVNode("span", {
              class: normalizeClass(_ctx.classList.singleLabelText),
              innerHTML: _ctx.iv[$props.label]
            }, null, 10 /* CLASS, PROPS */, _hoisted_6)
          ], 2 /* CLASS */)
        ])
      : createCommentVNode("v-if", true),
    createCommentVNode(" Multiple label "),
    ($props.mode == 'multiple' && _ctx.hasSelected && !_ctx.search)
      ? renderSlot(_ctx.$slots, "multiplelabel", {
          key: 3,
          values: _ctx.iv
        }, () => [
          createElementVNode("div", {
            class: normalizeClass(_ctx.classList.multipleLabel),
            innerHTML: _ctx.multipleLabelText,
            "aria-hidden": "true"
          }, null, 10 /* CLASS, PROPS */, _hoisted_7)
        ])
      : createCommentVNode("v-if", true),
    createCommentVNode(" Placeholder "),
    ($props.placeholder && !_ctx.hasSelected && !_ctx.search)
      ? renderSlot(_ctx.$slots, "placeholder", { key: 4 }, () => [
          createElementVNode("div", {
            class: normalizeClass(_ctx.classList.placeholder),
            "aria-hidden": "true"
          }, toDisplayString($props.placeholder), 3 /* TEXT, CLASS */)
        ])
      : createCommentVNode("v-if", true),
    createCommentVNode(" Spinner "),
    ($props.loading || _ctx.resolving)
      ? renderSlot(_ctx.$slots, "spinner", { key: 5 }, () => [
          createElementVNode("span", {
            class: normalizeClass(_ctx.classList.spinner),
            "aria-hidden": "true"
          }, null, 2 /* CLASS */)
        ])
      : createCommentVNode("v-if", true),
    createCommentVNode(" Clear "),
    (_ctx.hasSelected && !$props.disabled && $props.canClear && !_ctx.busy)
      ? renderSlot(_ctx.$slots, "clear", {
          key: 6,
          clear: _ctx.clear
        }, () => [
          createElementVNode("span", {
            tabindex: "0",
            role: "button",
            "aria-label": "❎",
            class: normalizeClass(_ctx.classList.clear),
            onClick: _cache[6] || (_cache[6] = (...args) => (_ctx.clear && _ctx.clear(...args))),
            onKeyup: _cache[7] || (_cache[7] = withKeys((...args) => (_ctx.clear && _ctx.clear(...args)), ["enter"]))
          }, [
            createElementVNode("span", {
              class: normalizeClass(_ctx.classList.clearIcon)
            }, null, 2 /* CLASS */)
          ], 34 /* CLASS, HYDRATE_EVENTS */)
        ])
      : createCommentVNode("v-if", true),
    createCommentVNode(" Caret "),
    ($props.caret && $props.showOptions)
      ? renderSlot(_ctx.$slots, "caret", { key: 7 }, () => [
          createElementVNode("span", {
            class: normalizeClass(_ctx.classList.caret),
            onClick: _cache[8] || (_cache[8] = (...args) => (_ctx.handleCaretClick && _ctx.handleCaretClick(...args))),
            "aria-hidden": "true"
          }, null, 2 /* CLASS */)
        ])
      : createCommentVNode("v-if", true),
    createCommentVNode(" Options "),
    createElementVNode("div", {
      class: normalizeClass(_ctx.classList.dropdown),
      tabindex: "-1"
    }, [
      renderSlot(_ctx.$slots, "beforelist", { options: _ctx.fo }),
      createElementVNode("ul", {
        class: normalizeClass(_ctx.classList.options),
        id: _ctx.ariaOwns
      }, [
        ($props.groups)
          ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.fg, (group, i, key) => {
              return (openBlock(), createElementBlock("li", {
                class: normalizeClass(_ctx.classList.group),
                key: key,
                id: _ctx.ariaGroupId(group),
                "aria-label": _ctx.ariaGroupLabel(group),
                "aria-selected": _ctx.isSelected(group),
                role: "option"
              }, [
                createElementVNode("div", {
                  class: normalizeClass(_ctx.classList.groupLabel(group)),
                  "data-pointed": _ctx.isPointed(group),
                  onMouseenter: $event => (_ctx.setPointer(group, i)),
                  onClick: $event => (_ctx.handleGroupClick(group))
                }, [
                  renderSlot(_ctx.$slots, "grouplabel", {
                    group: group,
                    isSelected: _ctx.isSelected,
                    isPointed: _ctx.isPointed
                  }, () => [
                    createElementVNode("span", {
                      innerHTML: group[$props.groupLabel]
                    }, null, 8 /* PROPS */, _hoisted_11)
                  ])
                ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_10),
                createElementVNode("ul", {
                  class: normalizeClass(_ctx.classList.groupOptions),
                  "aria-label": _ctx.ariaGroupLabel(group),
                  role: "group"
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(group.__VISIBLE__, (option, i, key) => {
                    return (openBlock(), createElementBlock("li", {
                      class: normalizeClass(_ctx.classList.option(option, group)),
                      "data-pointed": _ctx.isPointed(option),
                      "data-selected": _ctx.isSelected(option) || undefined,
                      key: key,
                      onMouseenter: $event => (_ctx.setPointer(option)),
                      onClick: $event => (_ctx.handleOptionClick(option)),
                      id: _ctx.ariaOptionId(option),
                      "aria-selected": _ctx.isSelected(option),
                      "aria-label": _ctx.ariaOptionLabel(option),
                      role: "option"
                    }, [
                      renderSlot(_ctx.$slots, "option", {
                        option: option,
                        isSelected: _ctx.isSelected,
                        isPointed: _ctx.isPointed,
                        search: _ctx.search
                      }, () => [
                        createElementVNode("span", {
                          innerHTML: option[$props.label]
                        }, null, 8 /* PROPS */, _hoisted_14)
                      ])
                    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_13))
                  }), 128 /* KEYED_FRAGMENT */))
                ], 10 /* CLASS, PROPS */, _hoisted_12)
              ], 10 /* CLASS, PROPS */, _hoisted_9))
            }), 128 /* KEYED_FRAGMENT */))
          : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.fo, (option, i, key) => {
              return (openBlock(), createElementBlock("li", {
                class: normalizeClass(_ctx.classList.option(option)),
                "data-pointed": _ctx.isPointed(option),
                "data-selected": _ctx.isSelected(option) || undefined,
                key: key,
                onMouseenter: $event => (_ctx.setPointer(option)),
                onClick: $event => (_ctx.handleOptionClick(option)),
                id: _ctx.ariaOptionId(option),
                "aria-selected": _ctx.isSelected(option),
                "aria-label": _ctx.ariaOptionLabel(option),
                role: "option"
              }, [
                renderSlot(_ctx.$slots, "option", {
                  option: option,
                  isSelected: _ctx.isSelected,
                  isPointed: _ctx.isPointed,
                  search: _ctx.search
                }, () => [
                  createElementVNode("span", {
                    innerHTML: option[$props.label]
                  }, null, 8 /* PROPS */, _hoisted_16)
                ])
              ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_15))
            }), 128 /* KEYED_FRAGMENT */))
      ], 10 /* CLASS, PROPS */, _hoisted_8),
      (_ctx.noOptions)
        ? renderSlot(_ctx.$slots, "nooptions", { key: 0 }, () => [
            createElementVNode("div", {
              class: normalizeClass(_ctx.classList.noOptions),
              innerHTML: $props.noOptionsText
            }, null, 10 /* CLASS, PROPS */, _hoisted_17)
          ])
        : createCommentVNode("v-if", true),
      (_ctx.noResults)
        ? renderSlot(_ctx.$slots, "noresults", { key: 1 }, () => [
            createElementVNode("div", {
              class: normalizeClass(_ctx.classList.noResults),
              innerHTML: $props.noResultsText
            }, null, 10 /* CLASS, PROPS */, _hoisted_18)
          ])
        : createCommentVNode("v-if", true),
      ($props.infinite && _ctx.hasMore)
        ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: normalizeClass(_ctx.classList.inifinite),
            ref: "infiniteLoader"
          }, [
            renderSlot(_ctx.$slots, "infinite", {}, () => [
              createElementVNode("span", {
                class: normalizeClass(_ctx.classList.inifiniteSpinner)
              }, null, 2 /* CLASS */)
            ])
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "afterlist", { options: _ctx.fo })
    ], 2 /* CLASS */),
    createCommentVNode(" Hacky input element to show HTML5 required warning "),
    ($props.required)
      ? (openBlock(), createElementBlock("input", {
          key: 8,
          class: normalizeClass(_ctx.classList.fakeInput),
          tabindex: "-1",
          value: _ctx.textValue,
          required: ""
        }, null, 10 /* CLASS, PROPS */, _hoisted_19))
      : createCommentVNode("v-if", true),
    createCommentVNode(" Native input support "),
    ($props.nativeSupport)
      ? (openBlock(), createElementBlock(Fragment, { key: 9 }, [
          ($props.mode == 'single')
            ? (openBlock(), createElementBlock("input", {
                key: 0,
                type: "hidden",
                name: $props.name,
                value: _ctx.plainValue !== undefined ? _ctx.plainValue : ''
              }, null, 8 /* PROPS */, _hoisted_20))
            : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.plainValue, (v, i) => {
                return (openBlock(), createElementBlock("input", {
                  type: "hidden",
                  name: `${$props.name}[]`,
                  value: v,
                  key: i
                }, null, 8 /* PROPS */, _hoisted_21))
              }), 128 /* KEYED_FRAGMENT */))
        ], 64 /* STABLE_FRAGMENT */))
      : createCommentVNode("v-if", true),
    createCommentVNode(" Create height for empty input "),
    createElementVNode("div", {
      class: normalizeClass(_ctx.classList.spacer)
    }, null, 2 /* CLASS */)
  ], 16 /* FULL_PROPS */, _hoisted_1))
}

script.render = render;
script.__file = "src/Multiselect.vue";

const Document = Node.create({
  name: "doc",
  topNode: true,
  content: "block+"
});
const Placeholder$1 = Extension.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something \u2026",
      showOnlyWhenEditable: true,
      showOnlyCurrent: true,
      includeChildren: false
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: ({ doc, selection }) => {
            const active = this.editor.isEditable || !this.options.showOnlyWhenEditable;
            const { anchor } = selection;
            const decorations = [];
            if (!active) {
              return null;
            }
            const emptyDocInstance = doc.type.createAndFill();
            const isEditorEmpty = (emptyDocInstance === null || emptyDocInstance === void 0 ? void 0 : emptyDocInstance.sameMarkup(doc)) && emptyDocInstance.content.findDiffStart(doc.content) === null;
            doc.descendants((node, pos) => {
              const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
              const isEmpty = !node.isLeaf && !node.childCount;
              if ((hasAnchor || !this.options.showOnlyCurrent) && isEmpty) {
                const classes = [this.options.emptyNodeClass];
                if (isEditorEmpty) {
                  classes.push(this.options.emptyEditorClass);
                }
                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(" "),
                  "data-placeholder": typeof this.options.placeholder === "function" ? this.options.placeholder({
                    editor: this.editor,
                    node,
                    pos,
                    hasAnchor
                  }) : this.options.placeholder
                });
                decorations.push(decoration);
              }
              return this.options.includeChildren;
            });
            return DecorationSet.create(doc, decorations);
          }
        }
      })
    ];
  }
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "TiptapHeading",
  __ssrInlineRender: true,
  props: {
    modelValue: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    var _a;
    const props = __props;
    const focusNextEditor = () => {
      const editors = document.querySelectorAll(".ProseMirror");
      let nextEditor = editors.item(1);
      if (nextEditor) {
        nextEditor.focus();
        return true;
      }
    };
    const Enter = Extension$1.create({
      addKeyboardShortcuts() {
        return {
          Enter: focusNextEditor,
          "Mod-Enter": focusNextEditor,
          ArrowDown: focusNextEditor
        };
      }
    });
    const CustomDocument = Document.extend({
      content: "heading"
    });
    const editor = useEditor({
      content: (_a = props.modelValue) != null ? _a : "",
      extensions: [
        CustomDocument,
        Text,
        Heading,
        Focus,
        Enter,
        History,
        Placeholder$1.configure({
          placeholder: "What\u2019s the title?"
        })
      ],
      autofocus: true,
      onUpdate(props2) {
        var _a2, _b;
        emit("update:modelValue", (_b = (_a2 = props2.editor.getJSON().content) == null ? void 0 : _a2[0].content) == null ? void 0 : _b[0].text);
      }
    });
    watch(
      () => props.modelValue,
      (newValue) => {
        var _a2, _b, _c, _d;
        const title = (_c = (_b = (_a2 = editor.value) == null ? void 0 : _a2.getJSON().content) == null ? void 0 : _b[0].content) == null ? void 0 : _c[0].text;
        const isSame = title === newValue;
        if (isSame)
          return;
        (_d = editor.value) == null ? void 0 : _d.commands.setContent(newValue, false);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(EditorContent), mergeProps({ editor: unref(editor) }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TiptapHeading.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Bubble",
  __ssrInlineRender: true,
  props: {
    editor: Object
  },
  setup(__props) {
    const props = __props;
    const nodeType = computed(() => {
      var _a, _b, _c;
      const selection = (_a = props.editor) == null ? void 0 : _a.state.selection;
      const isImage = ((_b = selection.node) == null ? void 0 : _b.type.name) === "image";
      const isIframe = ((_c = selection.node) == null ? void 0 : _c.type.name) === "iframe";
      const isText = selection instanceof TextSelection;
      if (isImage)
        return "image";
      if (isIframe)
        return "iframe";
      if (isText)
        return "text";
      return void 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.editor) {
        _push(ssrRenderComponent(unref(BubbleMenu), mergeProps({
          editor: __props.editor,
          "tippy-options": { duration: 100 }
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="p-2 rounded-xl shadow-md bg-white"${_scopeId}>`);
              if (unref(nodeType) === "text") {
                _push2(`<div class="flex items-center space-x-1 text-xl text-gray-400"${_scopeId}><button class="${ssrRenderClass([{ "is-active": __props.editor.isActive("bold") }, "bubble-item"])}"${_scopeId}><div class="i-ic-round-format-bold"${_scopeId}></div></button><button class="${ssrRenderClass([{ "is-active": __props.editor.isActive("italic") }, "bubble-item"])}"${_scopeId}><div class="i-ic-round-format-italic"${_scopeId}></div></button><button class="${ssrRenderClass([{ "is-active": __props.editor.isActive("strike") }, "bubble-item"])}"${_scopeId}><div class="i-ic-round-format-strikethrough"${_scopeId}></div></button><button class="${ssrRenderClass([{ "is-active": __props.editor.isActive("underline") }, "bubble-item"])}"${_scopeId}><div class="i-ic-round-format-underlined"${_scopeId}></div></button></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(nodeType) === "image") {
                _push2(`<div${_scopeId}><button class="bubble-item"${_scopeId}>Edit</button></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(nodeType) === "iframe") {
                _push2(`<div${_scopeId}><button class="bubble-item"${_scopeId}>Edit</button><button${_scopeId}>Focus</button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "p-2 rounded-xl shadow-md bg-white" }, [
                  unref(nodeType) === "text" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center space-x-1 text-xl text-gray-400"
                  }, [
                    createVNode("button", {
                      class: ["bubble-item", { "is-active": __props.editor.isActive("bold") }],
                      onClick: ($event) => __props.editor.chain().focus().toggleBold().run()
                    }, [
                      createVNode("div", { class: "i-ic-round-format-bold" })
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      class: ["bubble-item", { "is-active": __props.editor.isActive("italic") }],
                      onClick: ($event) => __props.editor.chain().focus().toggleItalic().run()
                    }, [
                      createVNode("div", { class: "i-ic-round-format-italic" })
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      class: ["bubble-item", { "is-active": __props.editor.isActive("strike") }],
                      onClick: ($event) => __props.editor.chain().focus().toggleStrike().run()
                    }, [
                      createVNode("div", { class: "i-ic-round-format-strikethrough" })
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      class: ["bubble-item", { "is-active": __props.editor.isActive("underline") }],
                      onClick: ($event) => __props.editor.chain().focus().toggleUnderline().run()
                    }, [
                      createVNode("div", { class: "i-ic-round-format-underlined" })
                    ], 10, ["onClick"])
                  ])) : createCommentVNode("", true),
                  unref(nodeType) === "image" ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("button", {
                      class: "bubble-item",
                      onClick: ($event) => __props.editor.commands.openModal("image")
                    }, "Edit", 8, ["onClick"])
                  ])) : createCommentVNode("", true),
                  unref(nodeType) === "iframe" ? (openBlock(), createBlock("div", { key: 2 }, [
                    createVNode("button", {
                      class: "bubble-item",
                      onClick: ($event) => __props.editor.commands.openModal("iframe")
                    }, "Edit", 8, ["onClick"]),
                    createVNode("button", null, "Focus")
                  ])) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tiptap/Bubble.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const Commands = Extension.create({
  name: "commands",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        }
      }
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        startOfLine: true,
        ...this.options.suggestion
      })
    ];
  }
});
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "CommandList",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Array,
      required: true
    },
    command: {
      type: Function,
      required: true
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const { items } = toRefs(props);
    const selectedIndex = ref(0);
    watch(items, () => selectedIndex.value = 0);
    const selectItem = (index) => {
      const item = items.value[index];
      if (item) {
        props.command(item);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        selectedIndex.value = (selectedIndex.value + items.value.length - 1) % items.value.length;
        return true;
      }
      if (event.key === "ArrowDown") {
        selectedIndex.value = (selectedIndex.value + 1) % items.value.length;
        return true;
      }
      if (event.key === "Enter") {
        selectItem(selectedIndex.value);
        return true;
      } else
        return;
    };
    expose({
      onKeyDown
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white px-2 py-4 rounded-xl shadow-xl flex flex-col w-72" }, _attrs))}>`);
      if (unref(items).length) {
        _push(`<!--[-->`);
        ssrRenderList(unref(items), (item, index) => {
          _push(`<button class="${ssrRenderClass([{ "!bg-light-300": index === selectedIndex.value }, "p-2 flex flex-col text-sm text-left rounded-lg bg-transparent transition"])}"><span>${ssrInterpolate(item.title)}</span><span class="opacity-40 text-xs">${ssrInterpolate(item.description)}</span></button>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="item">No result</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tiptap/CommandList.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const suggestion = {
  items: ({ query }) => {
    return [
      {
        title: "Heading 2",
        description: "Big section heading.",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
        }
      },
      {
        title: "Heading 3",
        description: "Medium section heading.",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
        }
      },
      {
        title: "Numbered List",
        description: "Create a list with numbering.",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).wrapInList("orderedList").run();
        }
      },
      {
        title: "Bulleted List",
        description: "Create a simple bulleted list.",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).wrapInList("bulletList").run();
        }
      },
      {
        title: "Image",
        description: "Upload or embed with link.",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).openModal("image").run();
        }
      },
      {
        title: "Iframe",
        description: "Embed website with link.",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).openModal("iframe").run();
        }
      }
    ].filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10);
  },
  render: () => {
    let component;
    let popup;
    return {
      onStart: (props) => {
        component = new VueRenderer(_sfc_main$a, {
          props,
          editor: props.editor
        });
        if (!props.clientRect) {
          return;
        }
        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start"
        });
      },
      onUpdate(props) {
        component.updateProps(props);
        if (!props.clientRect) {
          return;
        }
        popup[0].setProps({
          getReferenceClientRect: props.clientRect
        });
      },
      onKeyDown(props) {
        var _a;
        if (props.event.key === "Escape") {
          popup[0].hide();
          return true;
        }
        return (_a = component.ref) == null ? void 0 : _a.onKeyDown(props.event);
      },
      onExit() {
        popup[0].destroy();
        component.destroy();
      }
    };
  }
};
const HardBreak = Extension.create({
  addKeyboardShortcuts() {
    const defaultHandler = () => this.editor.commands.first(({ commands }) => [
      () => commands.newlineInCode(),
      () => commands.createParagraphNear(),
      () => commands.liftEmptyBlock(),
      () => commands.splitListItem("listItem"),
      () => commands.splitBlock()
    ]);
    const shiftEnter = () => {
      return this.editor.commands.first(({ commands }) => [
        () => commands.newlineInCode(),
        () => commands.createParagraphNear()
      ]);
    };
    const modEnter = () => {
      return this.editor.commands.first(({ commands }) => [
        () => commands.newlineInCode(),
        (a) => {
          commands.selectTextblockEnd();
          return commands.createParagraphNear();
        }
      ]);
    };
    return {
      Enter: defaultHandler,
      "Shift-Enter": shiftEnter,
      "Mod-Enter": modEnter
    };
  }
});
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
const Code = Extension.create({
  name: "code",
  addExtensions() {
    return [
      Code$1,
      CodeBlock,
      CodeBlockLowLight.configure({
        lowlight
      })
    ];
  }
});
function autolink(options) {
  return new Plugin({
    key: new PluginKey("autolink"),
    appendTransaction: (transactions, oldState, newState) => {
      const docChanges = transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc);
      const preventAutolink = transactions.some((transaction) => transaction.getMeta("preventAutolink"));
      if (!docChanges || preventAutolink) {
        return;
      }
      const { tr } = newState;
      const transform = combineTransactionSteps(oldState.doc, [...transactions]);
      const { mapping } = transform;
      const changes = getChangedRanges(transform);
      changes.forEach(({ oldRange, newRange }) => {
        getMarksBetween(oldRange.from, oldRange.to, oldState.doc).filter((item) => item.mark.type === options.type).forEach((oldMark) => {
          const newFrom = mapping.map(oldMark.from);
          const newTo = mapping.map(oldMark.to);
          const newMarks = getMarksBetween(newFrom, newTo, newState.doc).filter((item) => item.mark.type === options.type);
          if (!newMarks.length) {
            return;
          }
          const newMark = newMarks[0];
          const oldLinkText = oldState.doc.textBetween(oldMark.from, oldMark.to, void 0, " ");
          const newLinkText = newState.doc.textBetween(newMark.from, newMark.to, void 0, " ");
          const wasLink = test(oldLinkText);
          const isLink = test(newLinkText);
          if (wasLink && !isLink) {
            tr.removeMark(newMark.from, newMark.to, options.type);
          }
        });
        const nodesInChangedRanges = findChildrenInRange(newState.doc, newRange, (node) => node.isTextblock);
        let textBlock;
        let textBeforeWhitespace;
        if (nodesInChangedRanges.length > 1) {
          textBlock = nodesInChangedRanges[0];
          textBeforeWhitespace = newState.doc.textBetween(textBlock.pos, textBlock.pos + textBlock.node.nodeSize, void 0, " ");
        } else if (nodesInChangedRanges.length && newState.doc.textBetween(newRange.from, newRange.to, " ", " ").endsWith(" ")) {
          textBlock = nodesInChangedRanges[0];
          textBeforeWhitespace = newState.doc.textBetween(textBlock.pos, newRange.to, void 0, " ");
        }
        if (textBlock && textBeforeWhitespace) {
          const wordsBeforeWhitespace = textBeforeWhitespace.split(" ").filter((s) => s !== "");
          if (wordsBeforeWhitespace.length <= 0) {
            return false;
          }
          const lastWordBeforeSpace = wordsBeforeWhitespace[wordsBeforeWhitespace.length - 1];
          const lastWordAndBlockOffset = textBlock.pos + textBeforeWhitespace.lastIndexOf(lastWordBeforeSpace);
          if (!lastWordBeforeSpace) {
            return false;
          }
          find(lastWordBeforeSpace).filter((link) => link.isLink).filter((link) => {
            if (options.validate) {
              return options.validate(link.value);
            }
            return true;
          }).map((link) => ({
            ...link,
            from: lastWordAndBlockOffset + link.start + 1,
            to: lastWordAndBlockOffset + link.end + 1
          })).forEach((link) => {
            tr.addMark(link.from, link.to, options.type.create({
              href: link.href
            }));
          });
        }
      });
      if (!tr.steps.length) {
        return;
      }
      return tr;
    }
  });
}
function clickHandler(options) {
  return new Plugin({
    key: new PluginKey("handleClickLink"),
    props: {
      handleClick: (view, pos, event) => {
        var _a;
        const attrs = getAttributes(view.state, options.type.name);
        const link = (_a = event.target) === null || _a === void 0 ? void 0 : _a.closest("a");
        if (link && attrs.href) {
          window.open(attrs.href, attrs.target);
          return true;
        }
        return false;
      }
    }
  });
}
function pasteHandler(options) {
  return new Plugin({
    key: new PluginKey("handlePasteLink"),
    props: {
      handlePaste: (view, event, slice) => {
        const { state } = view;
        const { selection } = state;
        const { empty } = selection;
        if (empty) {
          return false;
        }
        let textContent = "";
        slice.content.forEach((node) => {
          textContent += node.textContent;
        });
        const link = find(textContent).find((item) => item.isLink && item.value === textContent);
        if (!textContent || !link) {
          return false;
        }
        options.editor.commands.setMark(options.type, {
          href: link.href
        });
        return true;
      }
    }
  });
}
const Link$1 = Mark.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: false,
  onCreate() {
    this.options.protocols.forEach(registerCustomProtocol);
  },
  onDestroy() {
    reset();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: true,
      linkOnPaste: true,
      autolink: true,
      protocols: [],
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      validate: void 0
    };
  },
  addAttributes() {
    return {
      href: {
        default: null
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [
      { tag: 'a[href]:not([href *= "javascript:" i])' }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0
    ];
  },
  addCommands() {
    return {
      setLink: (attributes) => ({ chain }) => {
        return chain().setMark(this.name, attributes).setMeta("preventAutolink", true).run();
      },
      toggleLink: (attributes) => ({ chain }) => {
        return chain().toggleMark(this.name, attributes, { extendEmptyMarkRange: true }).setMeta("preventAutolink", true).run();
      },
      unsetLink: () => ({ chain }) => {
        return chain().unsetMark(this.name, { extendEmptyMarkRange: true }).setMeta("preventAutolink", true).run();
      }
    };
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: (text) => find(text).filter((link) => {
          if (this.options.validate) {
            return this.options.validate(link.value);
          }
          return true;
        }).filter((link) => link.isLink).map((link) => ({
          text: link.value,
          index: link.start,
          data: link
        })),
        type: this.type,
        getAttributes: (match) => {
          var _a;
          return {
            href: (_a = match.data) === null || _a === void 0 ? void 0 : _a.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const plugins = [];
    if (this.options.autolink) {
      plugins.push(autolink({
        type: this.type,
        validate: this.options.validate
      }));
    }
    if (this.options.openOnClick) {
      plugins.push(clickHandler({
        type: this.type
      }));
    }
    if (this.options.linkOnPaste) {
      plugins.push(pasteHandler({
        editor: this.editor,
        type: this.type
      }));
    }
    return plugins;
  }
});
const Link = Link$1.extend({
  exitable: true
});
const Placeholder = Placeholder$1.extend({
  addOptions() {
    var _a;
    return {
      ...(_a = this.parent) == null ? void 0 : _a.call(this),
      placeholder: ({ node, editor }) => {
        const selection = editor.state.selection;
        if (selection instanceof TextSelection) {
          return " Type '/' for commands";
        }
      },
      includeChildren: true
    };
  }
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Upload",
  __ssrInlineRender: true,
  props: {
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const client = useSupabaseClient();
    const user = useSupabaseUser();
    const { files, open: openFileDialog, reset: reset2 } = useFileDialog({ accept: "image/*" });
    const { base64 } = useBase64(computed(() => {
      var _a, _b;
      return (_b = (_a = files.value) == null ? void 0 : _a.item) == null ? void 0 : _b.call(_a, 0);
    }));
    const imageSrc = ref(props.modelValue);
    const isUploading = ref(false);
    const upload = async (file) => {
      var _a, _b, _c;
      isUploading.value = true;
      const filename = `${(_a = user.value) == null ? void 0 : _a.id}/${file.name}`;
      const { data, error } = await client.storage.from("posts").upload(filename, file, { cacheControl: "3600" });
      const { publicURL } = client.storage.from("posts").getPublicUrl((_c = (_b = data == null ? void 0 : data.Key) == null ? void 0 : _b.replace("posts/", "")) != null ? _c : filename);
      emits("update:modelValue", publicURL);
      isUploading.value = false;
    };
    watch(files, async (n) => {
      if (n.length) {
        const file = n.item(0);
        upload(file);
      }
    });
    watch(base64, (n) => imageSrc.value = n);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        disabled: isUploading.value,
        accept: "image/*",
        type: "button",
        class: "block w-full p-0 ring-3 ring-transparent hover:ring-gray-400 focus:ring-gray-400 rounded-2xl transition overflow-hidden"
      }, _attrs))}><div class="h-64 w-full bg-light-300 flex items-center justify-center">`);
      if (imageSrc.value) {
        _push(`<img class="w-full h-full object-scale-down"${ssrRenderAttr("src", imageSrc.value)}>`);
      } else {
        _push(`<p class="text-gray-400">Press &#39;Enter&#39; to upload image</p>`);
      }
      _push(`</div></button>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Upload.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ModalImage",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    editor: Object
  },
  setup(__props) {
    const props = __props;
    const isVisible = ref(props.show);
    const alt = ref("");
    const image = ref("");
    const isLoading = ref(false);
    const save = async () => {
      if (!image.value)
        return;
      isLoading.value = true;
      props.editor.chain().focus().setImage({
        src: image.value,
        alt: alt.value
      }).run();
      isLoading.value = false;
      isVisible.value = false;
    };
    watch(isVisible, () => {
      if (!isVisible.value) {
        const editorEl = document.querySelector(".content .ProseMirror");
        if (editorEl)
          editorEl.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$e;
      const _component_Upload = _sfc_main$9;
      const _component_Button = _sfc_main$d;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        open: isVisible.value,
        "onUpdate:open": ($event) => isVisible.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col p-6"${_scopeId}><h2 class="text-3xl font-bold"${_scopeId}>Add image</h2><div class="my-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Upload, {
              modelValue: image.value,
              "onUpdate:modelValue": ($event) => image.value = $event
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-4 flex items-center"${_scopeId}><input type="text" name="alt-name" id="alt-name" placeholder="alternate"${ssrRenderAttr("value", alt.value)}${_scopeId}></div></div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              class: "btn-primary ml-2",
              loading: isLoading.value,
              onClick: save
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Save`);
                } else {
                  return [
                    createTextVNode("Save")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="btn-plain"${_scopeId}>Cancel</button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col p-6" }, [
                createVNode("h2", { class: "text-3xl font-bold" }, "Add image"),
                createVNode("div", { class: "my-6" }, [
                  createVNode(_component_Upload, {
                    modelValue: image.value,
                    "onUpdate:modelValue": ($event) => image.value = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "mt-4 flex items-center" }, [
                    withDirectives(createVNode("input", {
                      type: "text",
                      name: "alt-name",
                      id: "alt-name",
                      placeholder: "alternate",
                      "onUpdate:modelValue": ($event) => alt.value = $event
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, alt.value]
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_component_Button, {
                    class: "btn-primary ml-2",
                    loading: isLoading.value,
                    onClick: save
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Save")
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode("button", {
                    class: "btn-plain",
                    onClick: ($event) => isVisible.value = false
                  }, "Cancel", 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tiptap/ModalImage.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ModalIframe",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    editor: Object
  },
  setup(__props) {
    const props = __props;
    const open = ref(props.show);
    const url = ref("");
    const save = () => {
      var _a;
      if (!((_a = url.value) == null ? void 0 : _a.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)))
        return;
      props.editor.chain().focus().setIframe({
        src: url.value
      }).run();
      open.value = false;
    };
    watch(open, () => {
      if (!open.value) {
        const editorEl = document.querySelector(".content .ProseMirror");
        if (editorEl)
          editorEl.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$e;
      const _component_Button = _sfc_main$d;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col p-6"${_scopeId}><h2 class="text-3xl font-bold"${_scopeId}>Add iframe</h2><div class="flex items-center my-6"${_scopeId}><label for="url" class="mr-4 flex-shrink-0"${_scopeId}>URL :</label><input type="url" name="url" id="url" placeholder="https://supabase.com"${ssrRenderAttr("value", url.value)}${_scopeId}></div><div class="flex justify-end"${_scopeId}><button class="btn-plain"${_scopeId}>Cancel</button>`);
            _push2(ssrRenderComponent(_component_Button, {
              class: "btn-primary ml-2",
              onClick: save
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Save`);
                } else {
                  return [
                    createTextVNode("Save")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col p-6" }, [
                createVNode("h2", { class: "text-3xl font-bold" }, "Add iframe"),
                createVNode("div", { class: "flex items-center my-6" }, [
                  createVNode("label", {
                    for: "url",
                    class: "mr-4 flex-shrink-0"
                  }, "URL :"),
                  withDirectives(createVNode("input", {
                    type: "url",
                    name: "url",
                    id: "url",
                    placeholder: "https://supabase.com",
                    "onUpdate:modelValue": ($event) => url.value = $event
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, url.value]
                  ])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode("button", {
                    class: "btn-plain",
                    onClick: ($event) => open.value = false
                  }, "Cancel", 8, ["onClick"]),
                  createVNode(_component_Button, {
                    class: "btn-primary ml-2",
                    onClick: save
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Save")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tiptap/ModalIframe.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const Upload = Extension.create({
  name: "upload",
  addCommands() {
    return {
      openModal: (type) => ({ commands, editor }) => {
        let component;
        switch (type) {
          case "image": {
            component = _sfc_main$8;
            break;
          }
          case "iframe": {
            component = _sfc_main$7;
            break;
          }
        }
        if (!component)
          return;
        const instance = createApp(component, {
          show: true,
          editor
        }).mount("#modal");
        return !!instance;
      }
    };
  }
});
const Iframe = Node.create({
  name: "iframe",
  group: "block",
  atom: true,
  addOptions() {
    return {
      allowFullscreen: true,
      HTMLAttributes: {
        class: "iframe-wrapper"
      }
    };
  },
  addAttributes() {
    return {
      src: {
        default: null
      },
      frameborder: {
        default: 0
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "iframe"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      this.options.HTMLAttributes,
      ["iframe", mergeAttributes(HTMLAttributes, { frameborder: 10, tabindex: -1 })]
    ];
  },
  addCommands() {
    return {
      setIframe: (options) => ({ tr, dispatch }) => {
        const { selection } = tr;
        const node = this.type.create(options);
        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node);
        }
        return true;
      }
    };
  }
});
function mapChildren(node, callback) {
  const array = [];
  for (let i = 0; i < node.childCount; i++) {
    array.push(callback(node.child(i), i, node instanceof Fragment$1 ? node : node.content));
  }
  return array;
}
const moveNode = (type, dir) => {
  const isDown = dir === "down";
  return (state, dispatch) => {
    var _a;
    const { $from, node } = state.selection;
    const currentResolved = (_a = findParentNodeOfType(type)(state.selection)) != null ? _a : {
      depth: 1,
      node,
      pos: 34,
      start: 34
    };
    if (!currentResolved.node) {
      return false;
    }
    const { node: currentNode } = currentResolved;
    const parentDepth = currentResolved.depth - 1;
    const parent = $from.node(parentDepth);
    const parentPos = $from.start(parentDepth);
    if (currentNode.type !== type) {
      return false;
    }
    const arr = mapChildren(parent, (node2) => node2);
    let index = arr.indexOf(currentNode);
    let swapWith = isDown ? index + 1 : index - 1;
    if (swapWith >= arr.length || swapWith < 0) {
      return false;
    }
    const swapWithNodeSize = arr[swapWith].nodeSize;
    [arr[index], arr[swapWith]] = [arr[swapWith], arr[index]];
    let tr = state.tr;
    let replaceStart = parentPos;
    let replaceEnd = $from.end(parentDepth);
    const slice = new Slice(Fragment$1.fromArray(arr), 0, 0);
    tr = tr.step(new ReplaceStep(replaceStart, replaceEnd, slice, false));
    tr = tr.setSelection(
      Selection.near(tr.doc.resolve(isDown ? $from.pos + swapWithNodeSize : $from.pos - swapWithNodeSize))
    );
    if (dispatch) {
      dispatch(tr.scrollIntoView());
    }
    return true;
  };
};
const Move = Extension.create({
  name: "move",
  addCommands() {
    return {
      moveParent: (direction) => ({ editor, state, dispatch, ...a }) => {
        var _a, _b;
        const type = (_b = (_a = editor.state.selection.node) == null ? void 0 : _a.type) != null ? _b : editor.state.selection.$head.parent.type;
        return moveNode(type, direction)(state, dispatch);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Alt-ArrowUp": () => this.editor.commands.moveParent("up"),
      "Alt-ArrowDown": () => this.editor.commands.moveParent("down")
    };
  }
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Tiptap",
  __ssrInlineRender: true,
  props: {
    modelValue: null,
    editable: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    var _a, _b;
    const props = __props;
    const editor = useEditor({
      content: (_a = props.modelValue) != null ? _a : "",
      extensions: [
        Link,
        StarterKit,
        Image,
        Underline,
        Focus,
        Upload,
        HardBreak,
        Code,
        Placeholder,
        Iframe,
        Move,
        Commands.configure({
          suggestion
        })
      ],
      editable: (_b = props.editable) != null ? _b : false,
      onUpdate(props2) {
        emit("update:modelValue", props2.editor.getHTML());
      }
    });
    watch(
      () => props.modelValue,
      (newValue) => {
        var _a2, _b2;
        const isSame = ((_a2 = editor.value) == null ? void 0 : _a2.getHTML()) === newValue;
        if (isSame)
          return;
        (_b2 = editor.value) == null ? void 0 : _b2.commands.setContent(newValue, false);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TiptapBubble = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_TiptapBubble, { editor: unref(editor) }, null, _parent));
      _push(ssrRenderComponent(unref(EditorContent), {
        class: "content",
        editor: unref(editor)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tiptap.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Drawer",
  __ssrInlineRender: true,
  props: { open: Boolean, confirmAction: Function },
  emits: ["update:open"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const el = ref();
    onKeyStroke("Escape", () => emits("update:open", false));
    onClickOutside(el, () => {
      emits("update:open", !props.open);
    });
    const { activate, deactivate } = useFocusTrap(el);
    watch(
      () => props.open,
      (n) => nextTick(() => n ? activate() : deactivate()),
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.open) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 w-screen h-screen z-100 flex justify-end" }, _attrs))}><div class="inner w-full max-w-112 ml-8 bg-white rounded-xl shadow-xl overflow-hidden">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`Content`);
        }, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Drawer.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Toggle",
  __ssrInlineRender: true,
  props: {
    modelValue: Boolean,
    id: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({
        for: __props.id,
        class: "inline-flex relative items-center cursor-pointer"
      }, _attrs))}><input type="checkbox" class="peer h-1px w-1px absolute border-0 outline-none"${ssrIncludeBooleanAttr(Array.isArray(__props.modelValue) ? ssrLooseContain(__props.modelValue, null) : __props.modelValue) ? " checked" : ""}${ssrRenderAttr("id", __props.id)}><div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-gray-400 rounded-full peer-checked:bg-dark-300 transition"></div><div class="peer-checked:translate-x-full peer-checked:border-white absolute top-[2px] left-[2px] bg-white border-gray-400 rounded-full h-5 w-5 transition-all"></div><span class="ml-2">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`Toggle`);
      }, _push, _parent);
      _push(`</span></label>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Toggle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TagsInput",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Object, default: [] },
    id: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const client = useSupabaseClient();
    const { data: tags } = useAsyncData("tags", async () => {
      const { data } = await client.from("tags_view").select("*");
      return data ? data.map((i) => i.name) : [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(script), {
        modelValue: __props.modelValue,
        "onUpdate:modelValue": ($event) => isRef(modelValue) ? modelValue.value = $event : null,
        onChange: ($event) => emits("update:modelValue", $event),
        options: (_a = unref(tags)) != null ? _a : [],
        createOption: "",
        mode: "tags",
        placeholder: "Add tags",
        "close-on-select": false,
        searchable: true,
        classes: {
          container: "relative mx-auto p-2 w-full flex items-center justify-end cursor-pointer rounded-2xl bg-light-300",
          tag: "bg-dark-300 text-white text-sm font-semibold py-0.5 pl-2 rounded-lg mr-1.5 mb-1.5 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1",
          tagsSearch: "not-default bg-transparent absolute inset-0 border-0 focus:ring-0 outline-none appearance-none p-0 text-base font-sans box-border w-full",
          tagsSearchCopy: "invisible whitespace-pre-wrap inline-block h-px",
          placeholder: "flex items-center h-full absolute left-2 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5",
          dropdown: "max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full -mt-px py-2 overflow-y-scroll z-50 bg-light-300 flex flex-col rounded-b-2xl shadow-lg",
          dropdownHidden: "!hidden",
          optionPointed: "text-dark-300 bg-light-700",
          optionSelected: "text-dark-300 bg-light-700",
          noResults: "py-2 px-3 text-gray-400 text-center font-semibold"
        }
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TagsInput.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "EditPost",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    settings: Object
  },
  emits: ["update:show"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { settings } = toRefs(props);
    watch(
      () => props.show,
      () => {
        if (!props.show) {
          const editorEl = document.querySelector(".content .ProseMirror");
          if (editorEl)
            editorEl.focus();
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Drawer = _sfc_main$5;
      const _component_Toggle = _sfc_main$4;
      const _component_Upload = _sfc_main$9;
      const _component_TagsInput = _sfc_main$3;
      _push(ssrRenderComponent(_component_Drawer, mergeProps({
        open: __props.show,
        "onUpdate:open": ($event) => emits("update:show", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col px-4 py-12"${_scopeId}><h2 class="text-3xl font-bold"${_scopeId}>Settings</h2><div class="mt-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Toggle, {
              class: "mt-4",
              modelValue: unref(settings).active,
              "onUpdate:modelValue": ($event) => unref(settings).active = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Publish`);
                } else {
                  return [
                    createTextVNode("Publish")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-8"${_scopeId}><label for="url"${_scopeId}>Cover image: </label>`);
            _push2(ssrRenderComponent(_component_Upload, {
              class: "mt-4",
              modelValue: unref(settings).image,
              "onUpdate:modelValue": ($event) => unref(settings).image = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-8"${_scopeId}><label for="url"${_scopeId}>Tags: </label>`);
            _push2(ssrRenderComponent(_component_TagsInput, {
              class: "mt-4",
              modelValue: unref(settings).tags,
              "onUpdate:modelValue": ($event) => unref(settings).tags = $event
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col px-4 py-12" }, [
                createVNode("h2", { class: "text-3xl font-bold" }, "Settings"),
                createVNode("div", { class: "mt-8" }, [
                  createVNode(_component_Toggle, {
                    class: "mt-4",
                    modelValue: unref(settings).active,
                    "onUpdate:modelValue": ($event) => unref(settings).active = $event
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Publish")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-8" }, [
                  createVNode("label", { for: "url" }, "Cover image: "),
                  createVNode(_component_Upload, {
                    class: "mt-4",
                    modelValue: unref(settings).image,
                    "onUpdate:modelValue": ($event) => unref(settings).image = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-8" }, [
                  createVNode("label", { for: "url" }, "Tags: "),
                  createVNode(_component_TagsInput, {
                    class: "mt-4",
                    modelValue: unref(settings).tags,
                    "onUpdate:modelValue": ($event) => unref(settings).tags = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Drawer/EditPost.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["update:show"],
  setup(__props, { emit: emits }) {
    const client = useSupabaseClient();
    const signIn = async () => {
      await client.auth.signIn({ provider: "github" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$e;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        open: __props.show,
        "onUpdate:open": ($event) => emits("update:show", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-center px-6 py-12"${_scopeId}><h1 class="text-4xl font-bold text-center"${_scopeId}>Login</h1><button autofocus class="btn-primary w-max mt-6"${_scopeId}>Login with GitHub</button></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-center px-6 py-12" }, [
                createVNode("h1", { class: "text-4xl font-bold text-center" }, "Login"),
                createVNode("button", {
                  autofocus: "",
                  class: "btn-primary w-max mt-6",
                  onClick: signIn
                }, "Login with GitHub")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/Login.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const user = useSupabaseUser();
    const client = useSupabaseClient();
    const { params } = useRoute();
    const postId = ref(params.id);
    const title = postId.value ? ref("") : useLocalStorage("new-post-title", "");
    const body = postId.value ? ref("") : useLocalStorage("new-post-body", "");
    const settings = ref({
      image: "",
      active: false,
      tags: []
    });
    const isSaving = ref(false);
    const isLoginVisible = ref(false);
    const save = async () => {
      var _a, _b;
      if (!title.value || !stripHtml(body.value).result || isSaving.value)
        return;
      if (!((_a = user.value) == null ? void 0 : _a.id)) {
        isLoginVisible.value = true;
        return;
      }
      isSaving.value = true;
      const { data, error } = await client.from("posts").upsert({
        id: (_b = postId.value) == null ? void 0 : _b.toString(),
        slug: slugify(title.value, { lower: true }),
        title: title.value,
        body: body.value,
        author_id: user.value.id,
        active: settings.value.active,
        cover_img: settings.value.image,
        tags: settings.value.tags
      }).single();
      console.log({ data });
      if (data) {
        if (!postId.value) {
          postId.value = data.id;
          localStorage.removeItem("new-post-title");
          localStorage.removeItem("new-post-body");
          navigateTo(`/edit/${postId.value}`);
        }
      }
      isSaving.value = false;
    };
    useMagicKeys({
      passive: false,
      onEventFired(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "s" && e.type === "keydown") {
          e.preventDefault();
          save();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "e" && e.type === "keydown") {
          isDrawerOpen.value = !isDrawerOpen.value;
        }
      }
    });
    const { pending } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      `post-${postId.value}`,
      async () => {
        var _a, _b, _c;
        if (!postId.value)
          throw Error("no id found");
        const { data } = await client.from("posts").select("*").eq("id", postId.value).single();
        title.value = data == null ? void 0 : data.title;
        body.value = data == null ? void 0 : data.body;
        settings.value = {
          image: (_a = data == null ? void 0 : data.cover_img) != null ? _a : "",
          active: (_b = data == null ? void 0 : data.active) != null ? _b : false,
          tags: (_c = data == null ? void 0 : data.tags) != null ? _c : []
        };
        return data;
      },
      { server: false, lazy: true }
    )), __temp = await __temp, __restore(), __temp);
    const isDrawerOpen = ref(false);
    useCustomHead("Write your post");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Loader = __nuxt_component_1;
      const _component_Button = _sfc_main$d;
      const _component_TiptapHeading = _sfc_main$c;
      const _component_Tiptap = _sfc_main$6;
      const _component_DrawerEditPost = _sfc_main$2;
      const _component_ModalLogin = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_Loader, null, null, _parent));
      } else {
        _push(`<div class="flex flex-col mt-8"><div class="flex justify-end prose mx-auto w-full"><button${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} class="btn-plain mr-6"> Settings <span class="ml-2">\u2318E</span></button>`);
        _push(ssrRenderComponent(_component_Button, {
          loading: isSaving.value,
          class: "btn-primary",
          onClick: save
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Save <span class="ml-2"${_scopeId}>\u2318S</span>`);
            } else {
              return [
                createTextVNode("Save "),
                createVNode("span", { class: "ml-2" }, "\u2318S")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="md:p-2 prose mx-auto w-full" spellcheck="false">`);
        _push(ssrRenderComponent(_component_TiptapHeading, {
          modelValue: unref(title),
          "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null
        }, null, _parent));
        _push(ssrRenderComponent(_component_Tiptap, {
          editable: "",
          modelValue: unref(body),
          "onUpdate:modelValue": ($event) => isRef(body) ? body.value = $event : null
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_DrawerEditPost, {
          show: isDrawerOpen.value,
          "onUpdate:show": ($event) => isDrawerOpen.value = $event,
          settings: settings.value
        }, null, _parent));
        _push(`<div id="modal"></div>`);
        _push(ssrRenderComponent(_component_ModalLogin, {
          show: isLoginVisible.value,
          "onUpdate:show": ($event) => isLoginVisible.value = $event
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_.a576edca.mjs.map
