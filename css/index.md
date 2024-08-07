# css

- font-size:1.2 不带单位，默认单位是em
- pc端浏览器大都默认font-size:16px
- -webkit-text-size-adjust: 100%;/* 不允许浏览器自动调整文本大小 */
- -ms-text-size-adjust: 100%; /* 不允许IE浏览器自动调整文本大小 */
- -ms-overflow-style: scrollbar; /* 在IE浏览器中显示滚动条 */
- -webkit-tap-highlight-color: rgba(0, 0, 255, 0.5);/*在移动设备上，当用户点击或触摸页面上的链接或其他可点击元素时，浏览器会默认显示一个高亮效果，以提示用户已经成功点击了这个元素。 设置高亮颜色为半透明的蓝色 */
- left: unset;在 CSS 中，left: unset; 是用来重置元素的左侧位置属性的设置。它的作用是取消任何通过 CSS 显式设置的 left 属性，使元素恢复到其默认的布局行为或从父元素继承的值。

## flex

<br>

##### flex-shrink

**作用**

- 在 Flexbox 布局中，flex-shrink 属性决定了每个 flex 项目在 flex 容器空间不足时相对于其他项目应该收缩多少。它接受一个无单位的数字作为其属性值，表示项目的收缩比例。

**使用方法**

- 默认情况下，flex-shrink 的初始值为 1，意味着每个项目在需要时都会收缩。如果所有项目都设置为 flex-shrink: 1;，它们将等比例地收缩，以适应容器的剩余空间。
- 如果希望某些项目在容器空间不足时不收缩（即固定大小），可以将它们的 flex-shrink 设置为 0。这样这些项目不会在空间不足时自动缩小，而是保持其原始大小。
- 如果希望某些项目相对于其他项目更多地收缩，可以将它们的 flex-shrink 设置为一个大于 1 的值。这样它们会比其他项目更快地缩小，以填充剩余空间。
