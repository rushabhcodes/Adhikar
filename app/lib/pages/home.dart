import 'package:adhikar/pages/emergency.dart';
import 'package:adhikar/pages/filters.dart';
import 'package:adhikar/pages/forms.dart';
import 'package:adhikar/utils/colors.dart';
import 'package:adhikar/widgets/drawerItems.dart';
import 'package:adhikar/widgets/judgementCrad.dart';
import 'package:adhikar/widgets/homeLawCard.dart';
import 'package:adhikar/widgets/viewAllButton.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List circleColors = [
    const Color.fromRGBO(93, 161, 204, 200),
    const Color.fromARGB(56, 241, 193, 130),
  ];
  List boxColors = [
    const Color.fromARGB(255, 97, 160, 219),
    const Color.fromARGB(235, 247, 93, 93),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawerScrimColor: Colors.transparent,
      drawer: Drawer(
        backgroundColor: Colors.white,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: SafeArea(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(
                    height: 30,
                  ),
                  const SizedBox(
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 40,
                          backgroundColor: primaryColor,
                          child: CircleAvatar(
                            radius: 38,
                            backgroundColor: Colors.white,
                            backgroundImage: NetworkImage(
                              'https://image.cdn2.seaart.ai/2023-11-29/23980058360156165/96a282a29ec11f1e76f40a92621ae2ad854df3a4_high.webp',
                            ),
                          ),
                        ),
                        SizedBox(
                          width: 10,
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'username',
                              style:
                                  TextStyle(color: primaryColor, fontSize: 23),
                            ),
                            Text(
                              'Student',
                              style:
                                  TextStyle(color: Colors.grey, fontSize: 16),
                            ),
                          ],
                        )
                      ],
                    ),
                  ),
                  SizedBox(
                    height: MediaQuery.of(context).size.height * 0.1,
                  ),
                  SizedBox(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 35.0),
                      child: Column(
                        children: [
                          GestureDetector(
                            onTap: () {
                                Navigator.push(context,
                                  MaterialPageRoute(builder: (context) {
                                return const FiltersScreen();
                              }));
                            },
                            child: const DrawerItems(
                                image: 'assets/icons/ic_filter.png',
                                name: 'Filter'),
                          ),
                          GestureDetector(
                            onTap: () {},
                            child: const DrawerItems(
                                image: 'assets/icons/ic_fines.png',
                                name: 'Fines'),
                          ),
                          GestureDetector(
                            onTap: () {},
                            child: const DrawerItems(
                                image: 'assets/icons/ic_contact_us.png',
                                name: 'Contact us'),
                          ),
                          GestureDetector(
                            onTap: () {
                                Navigator.push(context,
                                  MaterialPageRoute(builder: (context) {
                                return const FormsScreen();
                              }));
                            },
                            child: const DrawerItems(
                                image: 'assets/icons/ic_forms.png',
                                name: 'Forms'),
                          ),
                          GestureDetector(
                            onTap: () {
                              Navigator.push(context,
                                  MaterialPageRoute(builder: (context) {
                                return const EmergencyScreen();
                              }));
                            },
                            child: const DrawerItems(
                                image: 'assets/icons/ic_emergency.png',
                                name: 'Emergency'),
                          ),
                          GestureDetector(
                            onTap: () {},
                            child: const DrawerItems(
                                image: 'assets/icons/ic_feedback.png',
                                name: 'Feedback'),
                          ),
                          GestureDetector(
                            onTap: () {},
                            child: const DrawerItems(
                                image: 'assets/icons/ic_rate_us.png',
                                name: 'Rate us'),
                          ),
                        
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: MediaQuery.of(context).size.height * 0.1,
                  ),
                  SizedBox(
                    child: Row(
                      children: [
                        Image.asset(
                          'assets/icons/ic_logout.png',
                          height: 20,
                          color: primaryColor,
                        ),
                        const SizedBox(
                          width: 10,
                        ),
                        const Text(
                          'Logout',
                          style: TextStyle(
                              color: primaryColor,
                              fontSize: 17,
                              fontWeight: FontWeight.w500),
                        ),
                      ],
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(90),
        child: AppBar(
          systemOverlayStyle: const SystemUiOverlayStyle(
              statusBarColor: primaryColor,
              statusBarIconBrightness: Brightness.light),
          iconTheme: const IconThemeData(color: Colors.white),
          flexibleSpace: Container(
            decoration: const BoxDecoration(
                color: Color.fromRGBO(16, 32, 55, 1),
                borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(20),
                    bottomRight: Radius.circular(20))),
          ),
          title: Container(
            height: 45,
            decoration: BoxDecoration(
              color: const Color.fromRGBO(44, 67, 94, 0.671),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: 10.0,
              ),
              child: Center(
                child: TextFormField(
                  cursorColor: Colors.white,
                  decoration: InputDecoration(
                    prefixIcon: Image.asset(
                      'assets/icons/ic_search.png',
                      height: 20,
                      color: Colors.white,
                    ),
                    enabledBorder:
                        const UnderlineInputBorder(borderSide: BorderSide.none),
                    focusedBorder:
                        const UnderlineInputBorder(borderSide: BorderSide.none),
                    hintText: 'Search',
                    hintStyle: const TextStyle(color: Colors.grey),
                  ),
                  style: const TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.w300),
                ),
              ),
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          const SizedBox(
            height: 10,
          ),
          const Padding(
            padding: EdgeInsets.all(10.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Laws',
                  style: TextStyle(
                      color: primaryColor,
                      fontSize: 25,
                      fontWeight: FontWeight.bold),
                ),
                ViewAllButton(),
              ],
            ),
          ),
          const SizedBox(
            height: 5,
          ),
          SizedBox(
            height: 210,
            child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: 10,
                itemBuilder: (context, index) {
                  return HomeLawCard(
                    content:
                        'The Indian Penal Code is the official criminal code of India. It is a comprehensive code intended.',
                    number: '22',
                    title: 'C.R.P.C Act',
                    year: '2015',
                    circleColor: circleColors[index % circleColors.length],
                    boxColor: boxColors[index % boxColors.length],
                  );
                }),
          ),
          const Padding(
            padding: EdgeInsets.all(10.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Judgements',
                  style: TextStyle(
                      color: primaryColor,
                      fontSize: 25,
                      fontWeight: FontWeight.bold),
                ),
                ViewAllButton(),
              ],
            ),
          ),
          const SizedBox(
            height: 5,
          ),
          SizedBox(
            height: 170,
            child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: 10,
                itemBuilder: (context, index) {
                  return JudgementCard(
                    content:
                        'AK Gopalan was a Communist leader who was kept in the Madras Jail in 1950.',
                    title: 'A.K Gopalan vs. State of Madras, 1950',
                    circleColor: circleColors[index % circleColors.length],
                  );
                }),
          ),
          const Text('data')
        ],
      ),
    );
  }
}
