import 'package:adhikar/pages/home.dart';
import 'package:adhikar/pages/page2.dart';
import 'package:adhikar/pages/Law.dart';
import 'package:adhikar/pages/page4.dart';
import 'package:adhikar/pages/profile.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class BottomBar extends StatefulWidget {
  const BottomBar({super.key});

  @override
  State<BottomBar> createState() => _BottomBarState();
}

class _BottomBarState extends State<BottomBar> {
  int _page = 0;
  late PageController pageController;

  List<Widget> pageList = [ const HomeScreen(),const page2(), const LawScreen(), const page4(), const ProfileScreen()];

  @override
  void initState() {
    super.initState();
    pageController = PageController();
  }

  @override
  void dispose() {
    super.dispose();
    pageController.dispose();
  }

  void onPageChanged(int page) {
    setState(() {
      _page = page;
    });
  }

  void navigationTapped(int page) {
    pageController.jumpToPage(page);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      
      body: PageView(
        physics: const NeverScrollableScrollPhysics(),
        controller: pageController,
        onPageChanged: onPageChanged,
        children: pageList,
      ),
      bottomNavigationBar: Container(
      margin: const EdgeInsets.symmetric(horizontal: 30.0,vertical: 20),
        height: 75,
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            border: Border.all(),
            color: Colors.black),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: CupertinoTabBar(
            border: Border.all(color: Colors.black),
            iconSize: 30,
            activeColor: Colors.white,
            backgroundColor: Colors.black,
            items: <BottomNavigationBarItem>[
               BottomNavigationBarItem(
                icon: ImageIcon(
                  const AssetImage('assets/icons/ic_home.png'),
                  size: 35,
                  color: (_page == 0) ? Colors.white : Colors.grey,
                ),
                backgroundColor: Colors.white,
              ),
              BottomNavigationBarItem(
                icon: ImageIcon(
                  const AssetImage('assets/icons/ic_document.png'),
                  size: 40,
                  color: (_page == 1) ? Colors.white : Colors.grey,
                ),
                backgroundColor: Colors.white,
              ),
              BottomNavigationBarItem(
                  icon: ImageIcon(
                    const AssetImage('assets/icons/ic_law.png'),
                    size: 40,
                    color: (_page == 2) ? Colors.white : Colors.grey,
                  ),
                  backgroundColor: Colors.white),
             
              BottomNavigationBarItem(
                icon: ImageIcon(
                  const AssetImage('assets/icons/ic_save.png'),
                  size: 20,
                  color: (_page == 3) ? Colors.white : Colors.grey,
                ),
                backgroundColor: Colors.white,
              ),
              BottomNavigationBarItem(
                icon: ImageIcon(
                  const AssetImage('assets/icons/ic_profile.png'),
                  size: 20,
                  color: (_page == 4) ? Colors.white : Colors.grey,
                ),
                backgroundColor: Colors.white,
              ),
            ],
            onTap: navigationTapped,
            currentIndex: _page,
          ),
        ),
      ),
    );
  }
}
