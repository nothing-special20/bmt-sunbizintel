<template>
  <div id="user-questions">
    <div v-if="!submitted" class="container">
      <h4>Request a Referral</h4>
      <div id="feedback-display-error">{{ msg }}</div>
      <div class="form-group">
        <label for="bniMbrName-item">What is your name?</label>
        <input id="bniMbrName-item" class="form-control" type="text" v-model="bniMbrName"/>
      </div>
      <div class="form-group">
        <label for="bniMbrEmail-item">What is your email?</label>
        <input id="bniMbrEmail-item" class="form-control" type="text" v-model="bniMbrEmail"/>
      </div>
      <div class="form-group">
        <label for="bniChapter-item">What BNI chapter are you in?</label>
        <input id="bniChapter-item" class="form-control" type="text" v-model="bniChapter"/>
      </div>
      <div class="form-group">
        <label for="refName-item">What is the name of the person who you want to meet?</label>
        <input id="refName-item" class="form-control" type="text" v-model="refName"/>
      </div>
      <div class="form-group">
        <label for="refCompany-item">What company do they work for?</label>
        <input id="refCompany-item" class="form-control" type="text" v-model="refCompany"/>
      </div>
      <div class="form-group">
        <label for="refJob-item">What is their job title?</label>
        <input id="refJob-item" class="form-control" type="text" v-model="refJob"/>
      </div>
      <div class="form-group">
        <label for="message-item">What message should someone from BNI send to them to introduce you?</label>
        <input id="message-item" class="form-control" type="text" v-model="message"/>
      </div>
      <button class="btn btn-primary" v-on:click="submit()">Submit</button>
    </div>
    <h4 v-if="submitted">
      Thank you for your feedback!
    </h4>
  </div>
</template>

<script>
// @ is an alias to /src
import ApiService from "@/http/api";

export default {
  name: "UserQuestions",
  components: {},
  data () {
    return {
      msg: "",
      submitted: false,
      bniMbrName: "",
      bniMbrEmail: "",
      bniChapter: "",
      refName: "",
      refCompany: "",
      refJob: "",
      message: ""
    };
  },
  methods: {
    submit () {
      ApiService.sendUserFeedback(this.bniMbrName, this.bniMbrEmail, this.bniChapter, this.refName, this.refCompany, this.refJob, this.message).then(() => {
        this.submitted = true;
      }).catch(err => {
        this.msg = err.response.data.msg;
      });
    }
  }
};
</script>

<style lang="scss">
#user-questions {
  margin-top: 10px;
  margin-bottom: 10px;

  h4 {
    font-weight: bold;
  }

  #feedback-display-error {
    color: red;
  }

  .form-group {
    text-align: left;

    label:nth-child(1) {
      font-weight: bold;
    }
  }
}
</style>
