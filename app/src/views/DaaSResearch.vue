<template>
  <div id="daas-research">
    <div v-if="!submitted" class="container">
      <h3>Request a Referral</h3>
      <br>
      <h5>Please Note: All fields in this survey are optional. Thank you very much for participating!</h5>
      <br>
      <div id="feedback-display-error">{{ msg }}</div>
      <div class="form-group">
        <label for="name-item">What is your name?</label>
        <input id="name-item" class="form-control" type="text" v-model="name"/>
      </div>
      <div class="form-group">
        <label for="job-item">Please list your job title.</label>
        <input id="job-item" class="form-control" type="text" v-model="job"/>
      </div>
      <div class="form-group">
        <label for="industry-item">Please list your industry.</label>
        <input id="industry-item" class="form-control" type="text" v-model="industry"/>
      </div>
      <div class="form-group">
        <label for="business-item">Please briefly describe your business.</label>
        <input id="business-item" class="form-control" type="text" v-model="business"/>
      </div>
      <div class="form-group">
        <label for="dataDesc-item">Please describe the data that you would like to use.</label>
        <input id="dataDesc-item" class="form-control" type="text" v-model="dataDesc"/>
      </div>
      <div class="form-group">
        <label for="dataUse-item">What would you like to use the data for?</label>
        <input id="dataUse-item" class="form-control" type="text" v-model="dataUse"/>
      </div>
      <div class="form-group">
        <label for="dataLink-item">If the data that you want already exists online, please include the url / link.</label>
        <input id="dataLink-item" class="form-control" type="text" v-model="dataLink"/>
      </div>
      <div class="form-group">
        <label for="dataValue-item">What would you pay to use this data?</label>
        <input id="dataValue-item" class="form-control" type="text" v-model="dataValue"/>
      </div>
      <div class="form-group">
        <label for="other-item">What else could you tell us about you and your needs so that we may better help you?</label>
        <input id="other-item" class="form-control" type="text" v-model="other"/>
      </div>
      <div class="form-group">
        <label for="currServices-item">What data services are you already paying for?</label>
        <input id="currServices-item" class="form-control" type="text" v-model="currServices"/>
      </div>
      <div class="form-group">
        <label for="email-item">What is your email?</label>
        <input id="email-item" class="form-control" type="text" v-model="email"/>
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
      name: "",
      job: "",
      industry: "",
      business: "",
      dataDesc: "",
      dataUse: "",
      dataLink: "",
      dataValue: "",
      other: "",
      currServices: "",
      email: ""
    };
  },
  methods: {
    submit () {
      ApiService.sendDaaSResearch(this.name, this.job, this.industry, this.business, this.dataDesc, this.dataUse, this.dataLink, this.dataValue, this.other, this.currServices, this.email).then(() => {
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
