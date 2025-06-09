require 'json'
require 'open3'

module Jekyll
  # The fix is on the next line
  class ShikiHighlighter < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
      @lang = text.strip
    end

    def render(context)
      code = super.strip

      # Prepare the JSON payload for the Node script
      payload = {
        code: code,
        lang: @lang
      }.to_json

      # Command to execute the Node script
      command = "node --no-warnings #{File.join(context.registers[:site].source, '_shiki', 'highlight.mjs')}"

      # Execute the command and capture the output
      highlighted_code, stderr, status = Open3.capture3(command, stdin_data: payload)

      if status.success?
        return highlighted_code
      else
        # If Shiki fails, fall back to plain code block and print an error
        warn "Shiki highlighting failed for language '#{@lang}': #{stderr}"
        return "<pre><code>#{CGI.escapeHTML(code)}</code></pre>"
      end
    end
  end
end

Liquid::Template.register_tag('shiki', Jekyll::ShikiHighlighter)
