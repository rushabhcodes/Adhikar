import 'package:adhikar/utils/colors.dart';
import 'package:adhikar/widgets/customButton.dart';
import 'package:adhikar/widgets/customTextfield.dart';
import 'package:dropdownfield2/dropdownfield2.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  TextEditingController statecontroller = TextEditingController();

  TextEditingController rolecontroller = TextEditingController();

  String selectedState = "";
  String selectedRole = "";
  final List<String> states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi (National Capital Territory)",
    "Puducherry",
    "Ladakh",
    "Jammu and Kashmir",
  ];
  final List<String> role = ["Student", "Lawyer", "Citizen"];

  @override
  void dispose() {
    super.dispose();
    statecontroller.dispose();
    rolecontroller.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        systemOverlayStyle: const SystemUiOverlayStyle(
            statusBarColor: primaryColor,
            statusBarIconBrightness: Brightness.light),
        iconTheme: const IconThemeData(color: Colors.white),
        title: const Text(
          'Profile',
          style: TextStyle(color: Colors.white),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(
                height: 20,
              ),
              const Stack(
                children: [
                  CircleAvatar(
                    radius: 70,
                    backgroundColor: Colors.black,
                    child: CircleAvatar(
                      radius: 66,
                      backgroundColor: Colors.white,
                      backgroundImage: NetworkImage(
                        'https://image.cdn2.seaart.ai/2023-11-29/23980058360156165/96a282a29ec11f1e76f40a92621ae2ad854df3a4_high.webp',
                      ),
                    ),
                  ),
                  Positioned(
                      bottom: -0,
                      right: 10,
                      child: CircleAvatar(
                        radius: 16,
                        backgroundColor: Colors.black,
                        child: CircleAvatar(
                            radius: 15,
                            backgroundColor: Colors.white,
                            child: Icon(
                              Icons.edit,
                              size: 20,
                              color: Colors.grey,
                            )),
                      ))
                ],
              ),
              const SizedBox(
                height: 30,
              ),
              const CustomTextField(
                hinttext: 'Enter your name',
                keyboardType: TextInputType.text,
              ),
              const SizedBox(
                height: 10,
              ),
              const CustomTextField(
                  hinttext: 'Enter your phone',
                  keyboardType: TextInputType.phone),
              const SizedBox(
                height: 10,
              ),
              const CustomTextField(
                  hinttext: 'Enter your email',
                  keyboardType: TextInputType.emailAddress),
              const SizedBox(
                height: 10,
              ),
              Row(
                children: [
                  Expanded(
                    child: DropDownField(
                      enabled: true,
                      textStyle:
                          const TextStyle(color: Colors.black, fontSize: 16),
                      controller: statecontroller,
                      hintText: 'Select your State',
                      hintStyle:
                          const TextStyle(color: Colors.grey, fontSize: 14),
                      items: states,
                      itemsVisibleInDropdown: 5,
                      onValueChanged: (value) {
                        setState(() {
                          statecontroller.text = value;
                        });
                      },
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.only(right: 16.0),
                    child: Text(
                      "*",
                      style: TextStyle(color: Colors.red),
                    ),
                  )
                ],
              ),
              Row(
                children: [
                  Expanded(
                    child: DropDownField(
                      enabled: true,
                      textStyle:
                          const TextStyle(color: Colors.black, fontSize: 16),
                      controller: rolecontroller,
                      hintText: 'Select your Role',
                      hintStyle:
                          const TextStyle(color: Colors.grey, fontSize: 14),
                      items: role,
                      itemsVisibleInDropdown: 3,
                      onValueChanged: (value) {
                        setState(() {
                          rolecontroller.text = value;
                        });
                      },
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.only(right: 16.0),
                    child: Text(
                      "*",
                      style: TextStyle(color: Colors.red),
                    ),
                  )
                ],
              ),
              const SizedBox(
                height: 20,
              ),
              const CustomButton(
                text: 'Finish',
              )
            ],
          ),
        ),
      ),
    );
  }
}
