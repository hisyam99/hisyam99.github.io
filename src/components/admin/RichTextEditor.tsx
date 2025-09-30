import {
  component$,
  useSignal,
  useVisibleTask$,
  $,
  type QRL,
} from "@builder.io/qwik";

interface RichTextEditorProps {
  value: string;
  onValueChange: QRL<(value: string) => void>;
  placeholder?: string;
  minHeight?: string;
}

export const RichTextEditor = component$<RichTextEditorProps>(
  ({
    value,
    onValueChange,
    placeholder = "Write your content here...",
    minHeight = "300px",
  }) => {
    const editorRef = useSignal<HTMLDivElement>();
    const isInitialized = useSignal(false);

    // Toolbar actions
    const execCommand = $((command: string, value?: string) => {
      document.execCommand(command, false, value);
      if (editorRef.value) {
        onValueChange(editorRef.value.innerHTML);
      }
    });

    const formatText = $((format: string) => {
      execCommand(format);
    });

    const insertLink = $(() => {
      const url = prompt("Enter URL:");
      if (url) {
        execCommand("createLink", url);
      }
    });

    const insertImage = $(() => {
      const url = prompt("Enter image URL:");
      if (url) {
        execCommand("insertImage", url);
      }
    });

    const changeTextColor = $((color: string) => {
      execCommand("foreColor", color);
    });

    const insertList = $((type: "ordered" | "unordered") => {
      if (type === "ordered") {
        execCommand("insertOrderedList");
      } else {
        execCommand("insertUnorderedList");
      }
    });

    const handleInput = $((event: Event) => {
      const target = event.target as HTMLDivElement;
      onValueChange(target.innerHTML);
    });

    const handlePaste = $((event: ClipboardEvent) => {
      event.preventDefault();
      const text = event.clipboardData?.getData("text/plain") || "";
      execCommand("insertText", text);
    });

    // Initialize editor content
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(() => value);

      if (editorRef.value && !isInitialized.value) {
        editorRef.value.innerHTML = value;
        isInitialized.value = true;
      } else if (
        editorRef.value &&
        isInitialized.value &&
        editorRef.value.innerHTML !== value
      ) {
        // Only update if the value is different to avoid cursor issues
        editorRef.value.innerHTML = value;
      }
    });

    return (
      <div class="border border-base-300 rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div class="bg-base-200 border-b border-base-300 p-2 flex flex-wrap items-center gap-1">
          {/* Basic formatting */}
          <div class="flex items-center gap-1 pr-2 border-r border-base-300">
            <button
              type="button"
              class="btn btn-xs btn-ghost"
              onClick$={() => formatText("bold")}
              title="Bold"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 4v2H5v8h1v2h6.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5H12c1.38 0 2.5-1.12 2.5-2.5S13.38 4 12 4H6zm3 2h3c.28 0 .5.22.5.5s-.22.5-.5.5H9V6zm0 4h3.5c.28 0 .5.22.5.5s-.22.5-.5.5H9v-1z" />
              </svg>
            </button>
            <button
              type="button"
              class="btn btn-xs btn-ghost"
              onClick$={() => formatText("italic")}
              title="Italic"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 4h4v2h-1.5l-2 8H7v2h4v-2h-1.5l2-8H13V4z" />
              </svg>
            </button>
            <button
              type="button"
              class="btn btn-xs btn-ghost"
              onClick$={() => formatText("underline")}
              title="Underline"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 3v7c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V3h-2v7h-4V3H6zm-1 14h10v2H5v-2z" />
              </svg>
            </button>
          </div>

          {/* Lists */}
          <div class="flex items-center gap-1 pr-2 border-r border-base-300">
            <button
              type="button"
              class="btn btn-xs btn-ghost"
              onClick$={() => insertList("unordered")}
              title="Bullet List"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 6h12v2H4V6zm0 5h12v2H4v-2z" />
                <circle cx="2" cy="7" r="1" />
                <circle cx="2" cy="12" r="1" />
              </svg>
            </button>
            <button
              type="button"
              class="btn btn-xs btn-ghost"
              onClick$={() => insertList("ordered")}
              title="Numbered List"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 6h10v2H6V6zm0 5h10v2H6v-2z" />
                <text x="2" y="8" class="text-xs">
                  1.
                </text>
                <text x="2" y="13" class="text-xs">
                  2.
                </text>
              </svg>
            </button>
          </div>

          {/* Links and Images */}
          <div class="flex items-center gap-1 pr-2 border-r border-base-300">
            <button
              type="button"
              class="btn btn-xs btn-ghost"
              onClick$={insertLink}
              title="Insert Link"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </button>
            <button
              type="button"
              class="btn btn-xs btn-ghost"
              onClick$={insertImage}
              title="Insert Image"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>

          {/* Alignment */}
          <div class="flex items-center gap-1 pr-2 border-r border-base-300">
            <button
              type="button"
              class="btn btn-xs btn-ghost"
              onClick$={() => formatText("justifyLeft")}
              title="Align Left"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4h10v2H3V4zm0 4h14v2H3V8zm0 4h10v2H3v-2z" />
              </svg>
            </button>
            <button
              type="button"
              class="btn btn-xs btn-ghost"
              onClick$={() => formatText("justifyCenter")}
              title="Align Center"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4h6v2H5V4zm-2 4h10v2H3V8zm2 4h6v2H5v-2z" />
              </svg>
            </button>
            <button
              type="button"
              class="btn btn-xs btn-ghost"
              onClick$={() => formatText("justifyRight")}
              title="Align Right"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 4h6v2H7V4zm4 4h6v2h-6V8zm-4 4h10v2H7v-2z" />
              </svg>
            </button>
          </div>

          {/* Text Color */}
          <div class="flex items-center gap-1">
            <input
              type="color"
              class="w-6 h-6 border-0 cursor-pointer"
              onChange$={(event) => {
                const target = event.target as HTMLInputElement;
                changeTextColor(target.value);
              }}
              title="Text Color"
            />
          </div>
        </div>

        {/* Editor */}
        <div class="relative">
          {!value && (
            <div class="absolute top-4 left-4 text-gray-400 pointer-events-none">
              {placeholder}
            </div>
          )}
          <div
            ref={editorRef}
            contentEditable="true"
            class="p-4 outline-none min-h-[200px] prose prose-sm max-w-none"
            style={{ minHeight }}
            onInput$={handleInput}
            onPaste$={handlePaste}
          />
        </div>
      </div>
    );
  },
);

export default RichTextEditor;
