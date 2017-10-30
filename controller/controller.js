app.controller('testController', function($scope, $http) {

 $scope.skillList = [];
 $scope.searchskillname="";
 $scope.showAdd = false;
 $scope.addSkills = {
  "skillid": "",
  "skillname": "",
  "status": null
 }

 /*var localData = localStorage.getItem('data');
 $scope.skillList.push(JSON.parse(localData))*/

 $scope.init = function () {
    getAllSkills();
  };

 $scope.addSkill = function() {
  var skillname =  $('#txt_new_skill').val();
  var post_data = {
      "skillname":skillname
  }
  $http
    .post('http://localhost:8888/skills/addnewskill', post_data)
    .then(function(res) {
      alert('New Skill Added Successfully!');
      getAllSkills();
    });
  }

 $scope.changeSkill = function(obj) {
  var a = $scope.skillList.indexOf(obj);
  $scope.skillList[a] = {
   "skillid": obj.skillid,
   "skillname": obj.skillname
  }
  $http
    .put('http://localhost:8888/skills/editskillname', $scope.skillList[a])
    .then(function(res) {
      alert('Skill Name Updated Successfully!');
    });
  }

 $scope.changeStatus = function(skillid,status){
  var post_data = {
    "skillid": skillid,
    "status": status
  };
  $http
    .put('http://localhost:8888/skills/changestatus', post_data)
    .then(function(res) {
      alert('Status Updated Successfully!');
      getAllSkills();
    });
  }


  $scope.findSkill = function () {
    $scope.searchskillname = $('#txt_skill_search').val();
    var params = $scope.searchskillname;
    $http.get('http://localhost:8888/skills/searchbyskillname',{
    headers: {'query': $scope.searchskillname}}).then(function(res) {
      $scope.skillList = res.data.data;
    });
  }

  function getAllSkills(){
    $http.get('http://localhost:8888/skills/getallskills').then(function(res) {
        $scope.skillList = res.data.data; 
    });
  }
})

/***************************************************************************************

            Please refer below angular code for calling apis

***************************************************************************************/

/*

   $http.get('/api/skills').then(function(res) {
    
        Must return below array of json
        *******************************************************
          Sample JSON
        *******************************************************  
        [{
          "id": "",
          "name": "",
          "status": null   //for approval (0 or 1)
        }]

    
    $scope.skillList = res.data; 
 });



  //Add 
  $scope.add = function() {
   $http
    .post('/api/skills', { name: $scope.data.name, status: $scope.data.status })
    .then(function(res) {
      alert('Skill added successfully!');
    });
  }

  Edit

  $scope.edit = function(index) {
    $scope.data = $scope.skillList[index];
    $http
      .put('/api/skills/'+ id +'/update', { name: $scope.data.name })
      .then(function(res) {
        alert('Skill updated Successfully');
      });
    $scope.openEdit = false;
  }


  //Change Statuys

  $scope.status = function(index, status){
    //Approve 
    $http
      .put('/api/skills/'+ id +'/approve', { status: status })
      .then(function(res) {
        alert('This skill is ' + (status === 1 ? 'Approved' : 'Rejected'));
      });   
  }

*/