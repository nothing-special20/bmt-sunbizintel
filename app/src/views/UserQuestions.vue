<template>
  <div id="user-questions">
    <div v-if="!submitted" class="container">
      <h4>Give Us Your Feedback</h4>
      <div id="feedback-display-error">{{ msg }}</div>
      <div class="form-group">
        <label for="job-item">What is your profession / job / title?</label>
        <input id="job-item" class="form-control" type="text" v-model="job"/>
      </div>
      <div class="form-group">
        <label for="industry-item">What industry are you in?</label>
        <input id="industry-item" class="form-control" type="text" v-model="industry"/>
      </div>
      <div class="form-group">
        <label for="change-item">What would you change about our tool?</label>
        <input id="change-item" class="form-control" type="text" v-model="change"/>
      </div>
      <div class="form-group">
        <label for="add-item">What would you add to our tool?</label>
        <input id="add-item" class="form-control" type="text" v-model="add"/>
      </div>
      <div class="form-group">
        <label for="other-item">What other comments do you have for us?</label>
        <input id="other-item" class="form-control" type="text" v-model="other"/>
      </div>
      <div class="form-group">
        <label for="email-item">What is your email? (optional)</label>
        <input id="email-item" class="form-control" type="text" v-mode="email"/>
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
      job: "",
      industry: "",
      change: "",
      add: "",
      other: "",
      email: ""
    };
  },
  methods: {
    submit () {
      ApiService.sendUserFeedback(this.job, this.industry, this.change, this.add, this.other, this.email).then(() => {
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
