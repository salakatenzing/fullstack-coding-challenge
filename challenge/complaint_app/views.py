from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
# Create your views here.

class ComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = ComplaintSerializer
  def list(self, request):
    # Get all complaints from the user's district
        user_profile = UserProfile.objects.get(user=request.user)
        #zfill pads left side string with zeros
        user_district = user_profile.district.zfill(2)
        search_key = "NYCC" + user_district

        complaints = Complaint.objects.filter(account=search_key)

        count_complaints = complaints.count()
        print(f"Complaints count: {count_complaints}")

        serializer = self.serializer_class(complaints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
  
  # class ComplaintViewSet(viewsets.ModelViewSet):
  #   http_method_names = ['get']
  #   serializer_class = ComplaintSerializer

  #   def list(self, request):
  #       user_profile = UserProfile.objects.get(user=request.user)
  #        #zfill pads left side string with zeros
  #       user_district = user_profile.district.zfill(2)
  #       search_key = "NYCC" + user_district

  #       complaints = Complaint.objects.filter(account=search_key)

  #       count_complaints = complaints.count()
  #       print(f"Complaints count: {count_complaints}")

  #       serializer = self.serializer_class(complaints, many=True)
  #       return Response(serializer.data, status=status.HTTP_200_OK)


class OpenCasesViewSet(viewsets.ModelViewSet):
   http_method_names = ['get']
   serializer_class = ComplaintSerializer
   def list(self, request):
    # Get only the open complaints from the user's district
      user_profile = UserProfile.objects.get(user=request.user)
      user_district = user_profile.district.zfill(2)
      search_key = "NYCC" + user_district

      open_cases = Complaint.objects.filter(council_dist=search_key, closedate__isnull=True)
      serializer = self.serializer_class(open_cases, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  serializer_class = ComplaintSerializer
  def list(self, request):
    # Get only complaints that are close from the user's district
      user_profile = UserProfile.objects.get(user=request.user)
      user_district = user_profile.district.zfill(2)
      search_key = "NYCC" + user_district

      closed_cases = Complaint.objects.filter(council_dist=search_key, closedate__isnull=False)
      #debugging check for all:closed
      # count_complaints = closed_cases.count()
      # print(f"Complaints count: {count_complaints}")
      serializer = self.serializer_class(closed_cases, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    # Get the top 3 complaint types from the user's district
    user_profile = UserProfile.objects.get(user=request.user)
    user_district = user_profile.district.zfill(2)
    search_key = "NYCC" + user_district

    top_types = (
        Complaint.objects
        .filter(council_dist=search_key)
        .values('complaint_type')
        .annotate(count=Count('complaint_type'))
        .order_by('-count')[:3]
    )
    return Response(top_types, status=status.HTTP_200_OK)