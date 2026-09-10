from pathlib import Path
import os
import re

root = Path(r"c:\Users\ontha\Downloads\web portfolio\web portfolio")
pattern = re.compile(r'(href|src)=(["\'])(/[^"\']*)(\2)')

for file in root.rglob('*.html'):
    text = file.read_text(encoding='utf-8')

    def repl(match):
        attr, quote, value, _ = match.groups()
        if value.startswith('//'):
            return match.group(0)

        if value == '/':
            target = root
        else:
            target = (root / value.lstrip('/')).resolve()

        rel = os.path.relpath(target, file.parent).replace('\\', '/')

        if value == '/' or value.endswith('/'):
            rel = './' if rel == '.' else rel.rstrip('/') + '/'
        elif rel == '.':
            rel = './'

        return f'{attr}={quote}{rel}{quote}'

    new_text = pattern.sub(repl, text)
    if new_text != text:
        file.write_text(new_text, encoding='utf-8')
        print(f'updated {file.relative_to(root)}')
