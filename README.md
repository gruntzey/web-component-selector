1. Add _grSelector_ folder to the root of your project
2. Add following line into your HTML 
```
<script src="./grSelector/grSelector.js" defer></script>
```
3. Create a __gr-selector__ tag in your HTML-file
4. Add __gr-selector-items__ attribute to tag. Fill it with a _string_ of words separated by commas
```
gr-selector-items='sample, items, here'
```
5. Thats all

Default selector's value is the first word in __gr-selector-items__ attribute
