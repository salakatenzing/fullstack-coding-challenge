from django.urls import path
from rest_framework import routers
from .views import ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet, ConstituentsComplaintsViewSet, CouncilMembersViewSet

router = routers.SimpleRouter()
router.register(r'allComplaints', ComplaintViewSet, basename='complaint')
router.register(r'openCases', OpenCasesViewSet, basename='openCases')
router.register(r'closedCases', ClosedCasesViewSet, basename='closedCases')
router.register(r'topComplaints', TopComplaintTypeViewSet, basename='topComplaints')
router.register(r'constituentsComplaints', ConstituentsComplaintsViewSet, basename='constituents-complaints')
router.register(r'councilmembers', CouncilMembersViewSet, basename='councilmembers')
urlpatterns = [
]
urlpatterns += router.urls