angular.module('starter.GroupService', [])
.factory('GroupService',function($http){

return{
createGroup:function(creategroup)
{
    return $http.post(url+'coupon/savegroup',creategroup);
},
inviteGroup:function(invitegroup)
{
    return $http.post(url+'coupon/savegroupmails',invitegroup);
},
getGroup:function(dat)
{
    return $http.post(url+'coupon/getusergroups',dat);
},
getGroupNotifications:function(uid)
{
    return $http.get(url+'coupon/groupnotifications/'+uid);
},
getRequestApproval:function(postapprej)
{
    return $http.post(url+'coupon/approvegroupinvitation',postapprej);
},
detailGroup:function(id)
{
    return $http.get(url+'coupon/groupdetails/'+id);
},
search:function(userinfo)
{
    return $http.post(url+'coupon/groupsearch',userinfo);
},
subscribe:function(sub)
{
    return $http.post(url+'coupon/grouprequest',sub);
},
unsubscribe:function(sub)
{
    return $http.post(url+'coupon/groupunsubscribe',sub);
}
}
})