<script setup lang="ts">
import $ from 'jquery';

window.$ = $;
window.jQuery = $;

// 延迟加载依赖 jQuery 的旧文件
import('./js/message.js');
import('./js/live2d.js');
</script>

<template>
<div id="landlord" style="left:80%;bottom:0px;">
    <div class="message" style="opacity:0"></div>
    <canvas id="live2d" width="500" height="560" class="live2d"></canvas>
    <div class="live_talk_input_body">
    	<div class="live_talk_input_name_body">
        	<input name="name" type="text" class="live_talk_name white_input" id="AIuserName" autocomplete="off" placeholder="你的名字" />
        </div>
        <div class="live_talk_input_text_body">
        	<input name="talk" type="text" class="live_talk_talk white_input" id="AIuserText" autocomplete="off" placeholder="要和我聊什么呀？"/>
            <button type="button" class="live_talk_send_btn" id="talk_send">发送</button>
        </div>
    </div>
    <input name="live_talk" id="live_talk" value="1" type="hidden" />
    <div class="live_ico_box">
    	<div class="live_ico_item type_info" id="showInfoBtn"></div>
    	<div class="live_ico_item type_talk" id="showTalkBtn" ></div>
        <div class="live_ico_item type_music" id="musicButton"></div>
        <div class="live_ico_item type_youdu" id="youduButton"></div>
        <div class="live_ico_item type_quit" id="hideButton"></div>
        <input name="live_statu_val" id="live_statu_val" value="0" type="hidden" />
        <audio src="" style="display:none;" id="live2d_bgm" data-bgm="0" preload="none"></audio>
        <input name="live2dBGM" value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="hidden">
        <input name="live2dBGM" value="https://t1.aixinxi.net/o_1c52p8frrlmf1aled1e14m56una.mp3" type="hidden">
        <input id="duType" value="douqilai,l2d_caihong" type="hidden">
    </div>
</div>
<div id="open_live2d">召唤蕾姆</div>
</template>

<style scoped>
@import url(./css/live2d.css);
</style>