from django.contrib.auth.models import User
from .models import UserProfile, Complaint
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'first_name','last_name')

class UserProfileSerializer(serializers.ModelSerializer):
    # BONUS Task: Flatten out the User object inside of UserProfile.
    id = serializers.IntegerField(source='user.id', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    class Meta:
        model = UserProfile
        fields = ('id','username','first_name','last_name','district','party','borough')

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = ('unique_key','account','opendate','complaint_type','descriptor','zip','borough','city','council_dist','community_board','closedate')