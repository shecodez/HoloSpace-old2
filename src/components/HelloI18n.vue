<template>
  <div>
    <p>{{ $t("hello") }}</p>
    <p>{{ $t("message") }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloI18n"
};
</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  },
  "ja": {
    "hello": "SFCのi18n、こんにちは！"
  }
}
</i18n>
