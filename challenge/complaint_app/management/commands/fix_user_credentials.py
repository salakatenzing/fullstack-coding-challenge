from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from complaint_app.models import UserProfile

class Command(BaseCommand):
    help = 'Fix usernames and passwords for council members'

    def handle(self, *args, **kwargs):
        users_fixed = 0

        for profile in UserProfile.objects.select_related('user'):
            user = profile.user
            if not user.first_name or not user.last_name:
                self.stdout.write(self.style.WARNING(f"Skipping user ID {user.id}: missing first or last name"))
                continue

            first_initial = user.first_name[0].lower()
            last_name = user.last_name.lower()
            correct_username = f"{first_initial}{last_name}"

           
            password = f"{last_name}-{int(profile.district)}"

            changed = False
            if user.username != correct_username:
                user.username = correct_username
                changed = True
            user.set_password(password)
            user.save()
            users_fixed += 1

            self.stdout.write(self.style.SUCCESS(f"Updated user {user.username} with password format '{password}'"))

        self.stdout.write(self.style.SUCCESS(f"Done fixing {users_fixed} users!"))
