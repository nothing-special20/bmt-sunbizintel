<template>
  <div id="test-view" class="container">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Address</th>
          <th>Description</th>
          <th>County</th>
          <th>Case</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.case">
          <td>{{ item.date }}</td>
          <td>{{ item.defendant }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.county }}</td>
          <td>{{ item.case }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import ApiService from "@/http/api";

export default {
  name: "Test",
  props: [],
  components: {},
  async created () {
    try {
      const response = await ApiService.test();
      console.log(response);
      this.data = response;
    } catch (err) {
      console.log(err);
    }
  },
  data () {
    return {
      data: {}
    };
  }
};
</script>

<style lang="scss">
#test-view {
  margin-top: 10px;
}
</style>
